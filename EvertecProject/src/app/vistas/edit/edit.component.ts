import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import { PersonI } from 'src/app/models/person.interface';
import {ApiEvertecService} from '../../servicios/api-evertec.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { PersonPruebaI } from 'src/app/models/PersonPrueba.interface';
import { FormsModule } from '@angular/forms';
import { YesNoPipe } from 'src/app/yes-no.pipe';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})


export class EditComponent implements OnInit {
 
  constructor(private activerouter:ActivatedRoute, private router:Router, private api:ApiEvertecService){

  }
  // En el componente, puedes crear un objeto de tipo PersonPruebaI con valores por defecto para todas las propiedades requeridas:
 inforUser: PersonI = {
  idPerson: 0,
  name: '',
  lastName: '',
  birthdate: new Date(),
  photo: '',
  idMaritalStatus: 0,
  haveBrothers: false
};

haveBrothers:string = "false";
birthdate:string = "1990-01-01";

ngOnInit(): void{
  let userId:number= Number(this.activerouter.snapshot.paramMap.get('id'));
  this.getUser(userId);  
}


/** Consulta un usuario por id */
getUser(userId: number)
{
this.api.getUser(userId).subscribe(data =>{   
    this.inforUser= data;
   const datePipe = new DatePipe('en-CO');
   this.birthdate = datePipe.transform(this.inforUser.birthdate, 'shortDate')!;
   this.haveBrothers = this.inforUser.haveBrothers? "true": "false";

   console.log(this.inforUser);

    // Inicializar el objeto person con el valor del idPerson
   //this.inforUser.idPerson = this.inforUser.idPerson;
   /* this.editForm.setValue({
      'idPerson': this.inforUser.idPerson,
      /*'name': this.inforUser.name,
      'lastName': this.inforUser.lastName,
      'birthdate': datePipe.transform(this.inforUser.birthdate, 'dd/MM/yyyy'),
      'photo':    this.inforUser.photo,
      'idMaritalStatus':this.inforUser.idMaritalStatus,
      'haveBrothers': this.inforUser.haveBrothers
    })*/
  })
}

//editar un usuario
editUser() {
  this.inforUser.haveBrothers = this.parseBoolean(this.haveBrothers);
  console.log(this.inforUser);

  //editar usuario
  this.api.putUser(this.inforUser).subscribe(data =>{ 
    this.router.navigate(['user']);
  });
}

//Convierte un string a boolean
private parseBoolean(value: string): boolean {
  return value === 'true';
}

}
