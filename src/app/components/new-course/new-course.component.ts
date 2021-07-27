import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Course } from 'src/app/course';
import { User } from 'src/app/user';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.css']
})
export class NewCourseComponent implements OnInit {
  course: Course | undefined;
  courses :Observable<any[]> | undefined;

  constructor (public db: AngularFireDatabase){
    this.courses = db.list('courses').valueChanges();
  }

  createCourse() {
    this.db.list('courses').push({content: this.course})
    // this.course = '';
  }

  

  ngOnInit(): void {
  }

}
