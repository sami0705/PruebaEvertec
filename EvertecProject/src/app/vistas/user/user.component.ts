import { Component, OnInit} from '@angular/core';
import {ApiEvertecService} from '../../servicios/api-evertec.service';
import {PersonI} from '../../models/person.interface'
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})


export class UserComponent implements OnInit{

  usersList: PersonI[] =[];

  constructor(private api:ApiEvertecService, private router:Router)
  {
    this.getPeople();
  }
  
  ngOnInit(): void {
    this.getPeople();
  }

  getPeople(): void{
    this.api.getUsers().subscribe(data => {
     this.usersList=data
   });
 }

}


