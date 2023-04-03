using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EvertecData.Context;
using EvertecData.Models;

namespace EvertecData.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly EvertecContext _context;

        public PeopleController(EvertecContext context)
        {
            _context = context;
        }

        // GET: api/People
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Person>>> GetPeople()
        {
            return await _context.People.ToListAsync();
        }

        // GET: api/People/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Person>> GetPerson(int id)
        {
            try
            {
                var person = await _context.People.FindAsync(id);

                if (person == null)
                {
                    return NotFound();
                }

                return person;
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al consultar el usuario: {ex.Message}");
            }
        }

        // PUT: api/People/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPerson(int id, Person person)
        {
            if (id != person.IdPerson)
            {
                return BadRequest();
            }

            _context.Entry(person).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al actualizar el usuario: {ex.Message}");
            }

            return NoContent();
        }


        /// <summary>
        /// Creación de un nuevo usuario
        /// </summary>
        /// <param name="person">Datos del usuario</param>
        /// <returns></returns>
        // POST: api/People
        [HttpPost]
        public async Task<ActionResult<Person>> PostPerson(Person person)
        {
            try { 
                _context.People.Add(person);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetPerson", new { id = person.IdPerson }, person);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al crear el usuario: {ex.Message}");
            }
        }

        // DELETE: api/People/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePerson(int id)
        {
            try
            {
                var person = await _context.People.FindAsync(id);
                if (person == null)
                {
                    return NotFound();
                }

                _context.People.Remove(person);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al eliminar el usuario: {ex.Message}");
            }
        }

        private bool PersonExists(int id)
        {
            return _context.People.Any(e => e.IdPerson == id);
        }
    }
}
