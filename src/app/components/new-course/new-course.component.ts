import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Course } from 'src/app/course';
import { AppComponent } from 'src/app/app.component';
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
  appComponent: AppComponent;

  constructor (public db: AngularFireDatabase,
     courseService: CourseService,
     appComponent: AppComponent ){
    this.courseService = courseService;
    this.appComponent = appComponent;
  }

  ngOnInit(): void {
    this.getCourses();
  }

  createCourse() {
    if(this.appComponent.isAdmin() || this.appComponent.isLector()) {
      this.db.list('courses').push({content: this.course});
    } else {
      alert('you are not allowed to do such action');
    }
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
