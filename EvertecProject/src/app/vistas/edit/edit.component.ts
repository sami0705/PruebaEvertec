import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import { PersonI } from 'src/app/models/person.interface';
import {ApiEvertecService} from '../../servicios/api-evertec.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})


export class EditComponent implements OnInit {
 
  constructor(private activerouter:ActivatedRoute, private router:Router, private api:ApiEvertecService){

  }

  inforUser:PersonI | undefined;

  editForm= new FormGroup({
    idPerson:   new FormControl(0), 
    name: new FormControl('',[Validators.required]),          
    lastName:   new FormControl(''),     
    birthdate:   new FormControl(''),    
    photo:       new FormControl(''),    
    idMaritalStatus: new FormControl(1),
    haveBrothers:  new FormControl(false)  
  })

ngOnInit(): void{
  this.getUser();  
}

getUser()
{
  let userId:number= Number(this.activerouter.snapshot.paramMap.get('id'));
  
  this.api.getUser(userId).subscribe(data =>{   
    this.inforUser= data;
    const datePipe = new DatePipe('en-CO');
    
    this.editForm.setValue({
      'idPerson': this.inforUser.idPerson,
      'name': this.inforUser.name,
      'lastName': this.inforUser.lastName,
      'birthdate': datePipe.transform(this.inforUser.birthdate, 'dd/MM/yyyy'),
      'photo':    this.inforUser.photo,
      'idMaritalStatus':this.inforUser.idMaritalStatus,
      'haveBrothers': this.inforUser.haveBrothers
    })
  })
}

putDataForm(form:Partial<PersonI>)
{
  //form.name = form.name ?? ''; // Proporcionar una cadena vacía si name es null
  let userId:number= Number(this.activerouter.snapshot.paramMap.get('id'));

  const data: PersonI = {
    idPerson: form.idPerson || 0,
    name: form.name || '',
    lastName: form.lastName || '',
    birthdate: form.birthdate || new Date(),
    photo: form.photo || null,
    idMaritalStatus: form.idMaritalStatus || 0,
    haveBrothers: form.haveBrothers || false
  };

  this.api.putUser(form as PersonI,userId).subscribe(data =>{

    console.log(data);
  })
}

}
