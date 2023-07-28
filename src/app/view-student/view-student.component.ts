import { Component, OnInit } from '@angular/core';
import { StudentService } from '../Service/student.service';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../Model/Model-UI/Studnet.Model';
import { GenderService } from '../Service/gender.service';
import { Gender } from '../Model/Model-Api/Gender.Model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
 studentId : string | null | undefined;
 student: Student = {
  id : '',
  firstName:'',
  lastName: '',
  dateOfBirth : '',
  email: '',
  mobile: 0,
  profileImageUrl : '',
  genderId: '',
  gender:{
    id:'',
    description:''
  },
  address:{
    id:'',
    physicalAddress: '',
    postalAddress: '',
  }
 }

 genderList :Gender[] =[];

  constructor(private service:StudentService, private route:ActivatedRoute, private genderSerice:GenderService,private snackbar:MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (param)=>{
        this.studentId = param.get('id')
      
      if(this.studentId){
        this.service.getStudent(this.studentId).subscribe(
          (res)=>{
            this.student = res
            
          }
        )
        this.genderSerice.getGenders().subscribe(
          (gerRes)=>{
            this.genderList = gerRes
          }
        )
      }
      }
      
    )
    
  }
  onUpdate(){
    this.service.updateStudent(this.student.id, this.student).subscribe(
      (res)=>{
        this.snackbar.open('Udate Successfuly',undefined,{
          duration: 2000
        });
      }
    )
    
  }
}
