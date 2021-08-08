import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Course } from 'src/app/course';
import { Lectors } from 'src/app/lectors';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { CourseService } from 'src/app/course.service';
import {map} from "rxjs/operators";
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class CoursesComponent implements OnInit {
  courses: Observable<Course[]> | undefined | any;
  courseSelected: Course | any;
  lectors:Observable<Lectors[]> |  any;
  courseService : CourseService;
  appComponent: AppComponent;

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
    this.courseService.updateCourse(form, this.db, key);
    this.closeModal()
  }

  deleteCourse(key:string) {
    this.courseService.deleteCourse(key, this.db);
    this.closeModal()
  }

  openModal(course: Course, content:any) {
    this.courseSelected = course;
    this.modalService.open(content);
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  ngOnInit(): void {
  }
}
