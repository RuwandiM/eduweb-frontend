import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IStudent } from '../../model/interface/student';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { NavbarComponent } from '../navbar/navbar.component'; 
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import SHA256 from 'crypto-js/sha256';

@Component({
  selector: 'app-student',
  imports: [CommonModule, NavbarComponent, HttpClientModule, FormsModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss',
  standalone: true,
})


export class StudentComponent implements OnInit {
  http = inject(HttpClient);
  
  studentList : IStudent [] = [];

  subjects : string[] = [
    'Physics',
    'Maths',
    'Chemistry',
    'Biology',
    'IT'
  ];

  subj_streams = [
    'Maths',
    'Bio',
    'Art',
    'Commerce',
    'Common'
  ]

  student: IStudent = {
    name: '',
    email: '',
    id: '',
    stream: '',
    subjects: [],
  }

  onSubjectChange(event: any, subject: string) {
    if (event.target.checked) {
      this.student.subjects.push(subject);
    } else {
      const index = this.student.subjects.indexOf(subject);
      if (index > -1) {
        this.student.subjects.splice(index, 1);
      }
    }
  }

  ngOnInit(): void {
    this.getAllStudents();
  }

  addStudentModalOpen = false;
  deleteStudentModalOpen = false;
  updateStudentModalOpen = false;
  deleteStudentId: string = '';
  updateStudentId: string = '';
  showAlert = false;
  successmsg = true;
  alertMessage = '';

  openDeleteStudentModal(studentId: string) {
    this.deleteStudentId = studentId;
    this.deleteStudentModalOpen = true; 
  }

  closeDeleteStudentModal() {
    this.deleteStudentModalOpen = false;
  }

  openAddStudentModal() {
    this.addStudentModalOpen = true;
  }

  colseAddStudentModal() {
    this.addStudentModalOpen = false;
  }

  openUpdateStudentModal(studentId: string) {
    this.updateStudentId = studentId;
    this.updateStudentModalOpen = true; 
    this.http.get(`http://localhost:8080/student/${studentId}`).subscribe((res: any) => {
      if (res.data) {
        this.student = res.data; 
      } else {
        console.error('Student not found');
        alert('Student not found');
      }
    })
  }

  closeUpdateStudentModal() {
    this.updateStudentModalOpen = false;
  }

  closeAlert() {
    this.showAlert = false;
  }

  getAllStudents() {
    this.http.get('http://localhost:8080/student').subscribe((res: any) => {
      this.studentList = res.data;
    });
    console.log(this.studentList);
  }

  addStudent() {
    if (!this.student.name || !this.student.email || !this.student.stream || this.student.subjects.length === 0) {
        this.alertMessage = 'Please fill in all fields!';
        this.successmsg = false;
        this.showAlert=true;
      return;
    } else {
      this.student.id = SHA256(this.student.email).toString();
      this.http.post('http://localhost:8080/student', this.student).subscribe({
        next: (res: any) => {
          this.colseAddStudentModal();
          this.alertMessage = 'Student added successfully!';
          this.showAlert=true;
          this.student = {
            name: '',
            email: '',
            id: '',
            stream: '',
            subjects: [],
          };
          this.getAllStudents();
        },
        error: (err) => {
          console.error('Error adding student:', err);
          this.alertMessage = 'Failed to add student. Please try again.';
          this.successmsg = false;
          this.showAlert=true;
        }
      });
    }
  }

  updateStudent() {
    if(!this.student.name || !this.student.email) {
      this.alertMessage = 'Please fill in all fields!';
      this.successmsg = false;
      this.showAlert=true;
      return;
    }
    this.http.put('http://localhost:8080/student', this.student).subscribe({  
      next: (res: any) => {
        this.closeUpdateStudentModal();
        this.alertMessage = 'Student updated successfully!';
        this.successmsg = true;
        this.showAlert=true;
        this.student = {
          name: '',
          email: '',
          id: '',
          stream: '',
          subjects: [],
        };
        this.getAllStudents();
      },
      error: (err) => {
        console.error('Error updating student:', err);
        this.alertMessage = 'Failed to update student. Please try again.';
        this.successmsg = false;
        this.showAlert=true;
      }
    });
  }

  deleteStudent() {
    this.http.delete(`http://localhost:8080/student/${this.deleteStudentId}`).subscribe({
      next: (res: any) => {
        this.closeDeleteStudentModal();
        this.alertMessage = 'Student deleted successfully!';
        this.successmsg = true;
        this.showAlert=true;
        this.getAllStudents();
      },
      error: (err) => {
        console.error('Error deleting student:', err);
        this.alertMessage = 'Failed to delete student. Please try again.';
        this.successmsg = false;
        this.showAlert=true;
      }
    });

  }
}
