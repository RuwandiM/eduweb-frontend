import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IStudent } from '../../model/interface/student';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { NavbarComponent } from '../navbar/navbar.component'; 
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-student',
  imports: [CommonModule, NavbarComponent, HttpClientModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss',
  standalone: true,
})


export class StudentComponent implements OnInit {
  http = inject(HttpClient);
  
  studentList : IStudent [] = [];

  ngOnInit(): void {
    this.getAllStudents();
  }

  getAllStudents() {
    this.http.get('http://localhost:8080/student').subscribe((res: any) => {
      this.studentList = res.data;
    });
    console.log(this.studentList);
  }
}
