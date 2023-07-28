import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../Service/student.service';
import { Student } from '../Model/Model-UI/Studnet.Model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
 student:Student[] = [];
 displayedColumns: string[] = ['firstName','lastName','dateOfBirth','email','mobile','gender','edit'];

 dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>();
 @ViewChild(MatPaginator) matPaginator !:MatPaginator;
 @ViewChild(MatSort) matSort !:MatSort;
 filterString = '';
  constructor(private service:StudentService) { }

  ngOnInit(): void {
    this.service.getStudents().subscribe({
      next:(res)=>{
       this.student = res
        this.dataSource = new MatTableDataSource<Student>(this.student);
        if(this.matPaginator){
          this.dataSource.paginator = this.matPaginator
        }
        if(this.matSort){
          this.dataSource.sort = this.matSort
        }
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  fileterStudent(){
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }
}

