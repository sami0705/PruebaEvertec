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
    idPerson:new FormControl(''), 
    name: new FormControl(''),          // string;
    lastName:   new FormControl(''),     //string;
    birthdate:   new FormControl(''),    //Date;
    photo:       new FormControl(''),    //null | string;
    idMaritalStatus: new FormControl(''),//number;
    haveBrothers:  new FormControl('')  //boolean;
    
  })

ngOnInit(): void{
  let userId:number= Number(this.activerouter.snapshot.paramMap.get('id'));
  this.api.getUser(userId).subscribe(data =>{
   
    this.inforUser= data;
    const datePipe = new DatePipe('en-US');
    
    this.editForm.setValue({
      'idPerson': this.inforUser.idPerson.toString(),
      'name': this.inforUser.name,
      'lastName': this.inforUser.lastName,
      'birthdate': datePipe.transform(this.inforUser.birthdate, 'dd/MM/yyyy'),
      'photo':    this.inforUser.photo,
      'idMaritalStatus':this.inforUser.idMaritalStatus.toString(),
      'haveBrothers': this.inforUser.haveBrothers.toString()
    })
  })
  
}

}
