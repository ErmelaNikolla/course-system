import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Course } from 'src/app/course';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { CourseService } from 'src/app/course.service';
import { AppComponent } from 'src/app/app.component';
import { DataService } from 'src/app/data.service';


@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {
  courses: Observable<any[]> | undefined | any;
  courseSelected: Course | any;
  courseService : CourseService;
  appComponent: AppComponent;
  keys:any;
  message: string | undefined;
  data: any;
  // @Input() mycoursesMesage: string | undefined;


  constructor(public db: AngularFireDatabase,
    config: NgbModalConfig,
    private modalService: NgbModal,              
    appComponent: AppComponent,
    courseService: CourseService ) {
      this.courses = db.list('student-courses').valueChanges();
      this.appComponent = appComponent;
      console.log('hello from')
      this.keys = db.list('courses')
      .snapshotChanges()
      // .pipe(map(items => {
      //   return items.map(a => {
      //     const data = a.payload.val();
      //     const key = a.payload.key;
      //     return {key, data};
      //   });
      // }));
      console.log(this.keys)
      config.backdrop = 'static';
      config.keyboard = false;
      this.courseService = courseService;
  }

  updateCourse(form: NgForm,key:string) {
    this.courseService.updateCourse(form, this.db,key);
  }

  deleteCourse(form: NgForm,key:string) {
    this.courseService.deleteCourse(key, this.db);
  }

  openModal(course: Course, content:any) {
    this.courseSelected = course;
    this.modalService.open(content);
  }

  ngOnInit(): void {
    this.courses?.subscribe(
      console.log
    )
    console.log('here-1')
    this.keys.subscribe(
      console.log
    )
    this.data.currentMessage.subscribe((message: any) => this.message = message)
  }


}
