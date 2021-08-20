import { UserService } from './../../user.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { Course } from 'src/app/course';
import { Lectors } from 'src/app/lectors';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { CourseService } from 'src/app/course.service';
import { map, switchMap, tap } from "rxjs/operators";
import { User } from 'src/app/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { NewCourseComponent } from '../new-course/new-course.component';
import { AppComponent } from 'src/app/app.component';


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
  lectors: Observable<Lectors[]> | any;
  coursesMessage = "message from courses";
  appComponent:AppComponent 

  userLoggedIn: any = {};

  isAdmin = false;
  isStudent = false;
  isLector = false;


  @ViewChild(ChildComponent) child: any;
  message: any;
  data: any;
  role: any;
  user: any;
  test: any;



  constructor(public db: AngularFireDatabase,
    private config: NgbModalConfig,
    private modalService: NgbModal,
    private courseService: CourseService,
    appComponent: AppComponent,
    private userService: UserService, private afAuth: AngularFireAuth) {this.appComponent = appComponent }

  ngOnInit(): void {
    this.config.backdrop = 'static';
    this.config.keyboard = false;


    // Get courses
    this.db.list('course').query.get().then(console.log)

    console.log(this.db.list('course', ref => ref.orderByChild('size').equalTo('large')).query.toJSON())



    // this.db.list('courses')
    //   .snapshotChanges()
    //   .pipe(
    //     tap(console.log),

    //     map(courses => {
    //       return courses.map((course: { payload: { key: any; val: () => any; }; }) => {
    //         return Object.assign({}, { key: course.payload.key }, course.payload.val());
    //       });
    //     }
    //     )
    //   ).subscribe();
    let coursesList = this.db.list('courses');
    this.courses = coursesList
      .snapshotChanges()
      .pipe(map(courses => {
        return courses.map(course => {
          return Object.assign({}, {key: course.payload.key}, course.payload.val());
        });
      }));




    // this.lectors = this.db.list('courses')
    //   .snapshotChanges()
    //   .pipe(map(lectors => {
    //     return lectors.map(lector => {
    //       return Object.assign({}, { key: lector.payload.key }, lector.payload.val());
    //     });
    //   }));


    // this.data.currentMessage.subscribe((message: any) => this.message = message)



    // Merr userin nga firebase
    this.afAuth.user.pipe(
      switchMap(user => {
        if (user) {
          this.userLoggedIn.id = user.uid;
          this.userLoggedIn.email = user.email;
        }
        return this.userService.getUserRole()
      }), switchMap(users => {
        this.userLoggedIn.role = users.filter((user: any) => user.email == this.userLoggedIn?.email)[0]?.role;
        console.log(this.userLoggedIn)

        if (this.userLoggedIn.role == 'admin') this.isAdmin = true;
        if (this.userLoggedIn.role == 'student') this.isStudent = true;
        if (this.userLoggedIn.role == 'lector') this.isLector = true;
        return of(true)
      })
    ).subscribe()






  }

  updateCourse(form: NgForm, key: string) {

    console.log("BEFORE")
    this.userService.getUserRole().pipe(
      tap(users => {
        // const role = users.filter((user: any) => user.email == this.appComponent.authedUser.email)[0].role;
        // TODO: HERE
        // if(role == 'admin') {
        //   this.test = 
        // }
        // if(role == 'lector') alert("LECTOR")
        // if(role == 'student') alert("STUDENT")


      })).subscribe()
    console.log("AFTER")

    if (this.isAdmin || this.isLector) {
      this.courseService.updateCourse(form, this.db, key);
      this.closeModal()
    } else {
      alert('you are not allowed to do such action');
    }
  }

  deleteCourse(key: string) {

    console.log("BEFORE")
    this.userService.getUserRole().pipe(
      tap(users => {
        // const role = users.filter((user: any) => user.email == this.appComponent.authedUser.email)[0].role;

        // TODO: HERE
        // if(role == 'admin') alert("ADMIN")
        // if(role == 'lector') alert("LECTOR")
        // if(role == 'student') alert("STUDENT")


      })).subscribe()
    console.log("AFTER")

    if (this.isAdmin) {
      this.courseService.deleteCourse(key, this.db);
      this.closeModal()
    } else {
      alert('you are not allowed to do such action');
    }
  }

  enrollCourse(course: Course) {

    console.log("BEFORE")
    this.userService.getUserRole().pipe(
      tap(users => {
        // const role = users.filter((user: any) => user.email == this.appComponent.authedUser.email)[0].role;

        // TODO: HERE
        // if(role == 'admin') alert("ADMIN")
        // if(role == 'lector') alert("LECTOR")
        // if(role == 'student') alert("STUDENT")


      })).subscribe()
    console.log("AFTER")

    this.courseService.enrollCourse(course, 'student', this.db);
  }

  openModal(course: Course, content: any) {
    this.courseSelected = course;
    this.modalService.open(content);
  }

  closeModal() {
    this.modalService.dismissAll();
  }


}
function ChildComponent(ChildComponent: any) {
  throw new Error('Function not implemented.');
}

function role(role: any) {
  throw new Error('Function not implemented.');
}

