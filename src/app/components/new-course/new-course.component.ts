import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Course } from 'src/app/course';
import { CourseService } from 'src/app/course.service';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.css']
})
export class NewCourseComponent implements OnInit {
  course : Course | undefined;
  courses : Observable<any[]> | undefined;
  courseService : CourseService;

  constructor (public db: AngularFireDatabase, courseService: CourseService ){
    this.courseService = courseService;
  }

  ngOnInit(): void {
    this.getCourses();
  }

  createCourse() {
    this.db.list('courses').push({content: this.course});
  }

  getCourses() {
    this.courses = this.db.list('courses').valueChanges();
  }
  
  onAddCourse(addForm: NgForm): void {
        // document.getElementById('add-course-form').click();
        console.log(addForm.value);

        this.courseService.addCourse(addForm, this.db);
    }

}
