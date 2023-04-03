using System;
using System.Collections.Generic;

#nullable disable

namespace EvertecData.Models
{
    public partial class Person
    {
        public int IdPerson { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public DateTime Birthdate { get; set; }
        public byte[] Photo { get; set; }
        public int IdMaritalStatus { get; set; }
        public bool HaveBrothers { get; set; }
    }
}
