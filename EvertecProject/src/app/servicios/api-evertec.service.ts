import { Injectable } from '@angular/core';
import { PersonI } from '../models/person.interface';
import {HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiEvertecService {
   
  constructor(private http: HttpClient) { }

 getUsers() : Observable<PersonI[]>{
    let url= "/api/People";
    return this.http.get<PersonI[]>(url);
  }

  getUser(id:number): Observable<PersonI>
  { 
    let url= "/api/People/" + id;
    return this.http.get<PersonI>(url);
  }

}
