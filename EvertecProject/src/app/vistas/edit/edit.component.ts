import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import { PersonI } from 'src/app/models/person.interface';
import {ApiEvertecService} from '../../servicios/api/api-evertec.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
import {AlertsService} from '../../servicios/alerts/alerts.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})


export class EditComponent implements OnInit {
 
  constructor(private activerouter:ActivatedRoute, private router:Router, private api:ApiEvertecService, private alert:AlertsService){

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
    
    /*if(data.status === 200)
      this.alert.showSuccess("Usuario modificado exitosamente","Edición Exitosa");
    else
      this.alert.showError("Se presentó un errr al editar el usuario","Error");*/
      console.log(data);
      this.alert.showSuccess("Usuario modificado exitosamente","Edición Exitosa");
    this.router.navigate(['user']);
  });
}

//Convierte un string a boolean
parseBoolean(value: string): boolean {
  return value === 'true';
}

volver()
{
  this.router.navigate(['user']);
}


}


