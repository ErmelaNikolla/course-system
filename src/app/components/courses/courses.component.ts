import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Course } from 'src/app/course';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { CourseService } from 'src/app/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class CoursesComponent implements OnInit {
  courses: Observable<any[]> | undefined;
  courseSelected: Course | any;
  courseService : CourseService;

  constructor(public db: AngularFireDatabase,
    config: NgbModalConfig, 
    private modalService: NgbModal, 
    courseService: CourseService ) {
      this.courses = db.list('courses').valueChanges();
      console.log('you are here')
      console.log(this.courses)
      config.backdrop = 'static';
      config.keyboard = false;
      this.courseService = courseService;
  }

  updateCourse(form: NgForm) {
    console.log(form);
    this.courseService.updateCourse(form, this.db);
  }
  
  openModal(course: Course, content:any) {
    console.log(course.key)
    this.courseSelected = course;
    this.modalService.open(content);
  }

  ngOnInit(): void {
  }

}
