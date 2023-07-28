import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gender } from '../Model/Model-Api/Gender.Model';

@Injectable({
  providedIn: 'root'
})
export class GenderService {
  baseApiUrl = "http://localhost:61551";
  constructor(private http:HttpClient) { }

  getGenders():Observable<Gender[]>{
   return this.http.get<Gender[]>(this.baseApiUrl + '/Genders')
  }
  // getStudent(studentId: string):Observable<Student>{
  //   return this.http.get<Student>(this.baseApiUrl + '/Students/' + studentId)
  // }
}
