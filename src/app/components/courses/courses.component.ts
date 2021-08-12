import { MyCoursesComponent } from './../my-courses/my-courses.component';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Course } from 'src/app/course';
import { Lectors } from 'src/app/lectors';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { CourseService } from 'src/app/course.service';
import {map} from "rxjs/operators";
import { AppComponent } from 'src/app/app.component';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  providers: [NgbModalConfig, NgbModal],
  // <app-my-courses [mycoursesMessage]="coursesMessage"></app-my-courses>
})
export class CoursesComponent implements OnInit {
  courses: Observable<Course[]> | undefined | any;
  courseSelected: Course | any;
  lectors:Observable<Lectors[]> |  any;
  courseService : CourseService;
  appComponent: AppComponent;
  coursesMessage = "message from courses";
  @ViewChild(ChildComponent) child: any;
  message: any;
  data: any;

  constructor(public db: AngularFireDatabase,
              config: NgbModalConfig,
              private modalService: NgbModal,
              courseService: CourseService,
              appComponent: AppComponent) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.courseService = courseService;
    this.appComponent = appComponent;
    let coursesList = db.list('courses');
    this.courses = coursesList
      .snapshotChanges()
      .pipe(map(courses => {
        return courses.map(course => {
          return Object.assign({}, {key: course.payload.key}, course.payload.val());
        });
      }));

    this.lectors = coursesList
      .snapshotChanges()
      .pipe(map(lectors => {
        return lectors.map(lector => {
          return Object.assign({}, {key: lector.payload.key}, lector.payload.val());
        });
      }));
  }

  updateCourse(form: NgForm,key:string) {
    if(this.appComponent.isAdmin() || this.appComponent.isLector()) {
      this.courseService.updateCourse(form, this.db, key);
      this.closeModal()
    } else {
      alert('you are not allowed to do such action');
    }
  }

  deleteCourse(key:string) {
    if(this.appComponent.isAdmin()) {
      this.courseService.deleteCourse(key, this.db);
      this.closeModal()
    } else {
      alert('you are not allowed to do such action');
    }
  }

  enrollCourse(course : Course) {
    this.courseService.enrollCourse(course, 'student@course.com', this.db);
  }

  openModal(course: Course, content:any) {
    this.courseSelected = course;
    this.modalService.open(content);
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  ngOnInit(): void {
    this.data.currentMessage.subscribe((message: any) => this.message = message)
  }
}
function ChildComponent(ChildComponent: any) {
  throw new Error('Function not implemented.');
}

