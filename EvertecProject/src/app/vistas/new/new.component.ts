import { Component } from '@angular/core';
import { PersonI } from 'src/app/models/person.interface';
import {ApiEvertecService} from '../../servicios/api/api-evertec.service';
import {Router} from '@angular/router';
import {AlertsService} from '../../servicios/alerts/alerts.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})

export class NewComponent {

  constructor(private router:Router, private api:ApiEvertecService,private alert:AlertsService){

  }

  //Se crea un objeto de tipo PersonPruebaI con valores por defecto para todas las propiedades requeridas:
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


//Convierte un string a boolean
parseBoolean(value: string): boolean {
  return value === 'true';
}

//Crea un usuario
newUser() {
  this.inforUser.haveBrothers = this.parseBoolean(this.haveBrothers);

  //editar usuario
  this.api.postUser(this.inforUser).subscribe(data =>{ 
    
    /*if(data.status === 200)
      this.alert.showSuccess("Usuario modificado exitosamente","Edición Exitosa");
    else
      this.alert.showError("Se presentó un errr al editar el usuario","Error");*/
      console.log(data);
      this.alert.showSuccess("Usuario creado exitosamente","Creación Exitosa");
    this.router.navigate(['user']);
  });
}

volver()
{
  this.router.navigate(['user']);
}

}
