import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../Model/Model-Api/Student.Model';
import { UpdateStudentRequest } from '../Model/Model-Api/UpdateStudent.Model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
 baseApiUrl = "http://localhost:61551";
  constructor(private http:HttpClient) { }

  getStudents():Observable<Student[]>{
   return this.http.get<Student[]>(this.baseApiUrl + '/Students')
  }
  getStudent(studentId: string):Observable<Student>{
    return this.http.get<Student>(this.baseApiUrl + '/Students/' + studentId)
  }
 
  updateStudent(studnetId:string, StudentRequest:Student):Observable<Student>{
      const UpdateStudentRequest :UpdateStudentRequest ={
        firstName : StudentRequest.firstName,
        lastName : StudentRequest.lastName,
        dateOfBirth : StudentRequest.dateOfBirth,
        email : StudentRequest.email,
        mobile : StudentRequest.mobile,
        genderId : StudentRequest.genderId,
        physicalAddress : StudentRequest.address.physicalAddress,
        postalAddress : StudentRequest.address.postalAddress,
      }
      return this.http.put<Student>(this.baseApiUrl+ '/Students/'+studnetId,StudentRequest)
  }
}
