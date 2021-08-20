import { UserService } from './user.service';
import { User } from './user';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map, tap } from "rxjs/operators";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title: string = 'Course System';
  menuItems = [
    { 'title': 'My courses', 'url': '/courses/id', 'component': 'my-courses' },
    { 'title': 'Courses', 'url': '/courses', 'component': 'courses' },
    { 'title': 'Create new course', 'url': '/courses/new', 'component': 'new-course'  } 
  ];
  menuItems2 = [
    { 'title': 'My courses', 'url': '/courses/id', 'component': 'my-courses' },
    { 'title': 'Courses', 'url': '/courses', 'component': 'courses' },
  ]
  address: string = 'Tirana/Albania';
  creators = ['Ermela Nikolla'];
  authedUser: any;
  user: any;
  userService: UserService;
  test: boolean = false;
  router: any;

  constructor(private afAuth: AngularFireAuth, userService: UserService) {
    this.userService = userService;
  }
  public isUserLoggedin = false;
  ngOnInit(): void {
    this.authedUser = { email: '' }
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        console.log("😊", res);
        this.authedUser = res;
        this.isUserLoggedin = true;
      }
    });

  }

  // public isAdmin(): boolean {
  //   this.userService.getUserRole().pipe(
  //     tap(users => {
  //       console.log("Users",users)
  //       const role = users.filter((user: any) => user.email == this.authedUser.email)[0].role;
  //       if (role == 'admin') {
  //         this.test = true;
  //         console.log(this.test + '-value')
  //       }
  //     })).subscribe()

  //   console.log(this.test + '+value')
  //   return this.test;
  // }

  // public isLector(): any {
  //   this.test = false;

  //   this.userService.getUserRole().pipe(
  //     tap(users => {
  //       const role = users.filter((user: any) => user.email == this.authedUser.email)[0].role;
  //       if (role == 'lector') {
  //         this.test = true;
  //         // console.log(this.test+'-value')
  //       }
  //     })).subscribe()
  //   // console.log(this.test)
  //   return this.test;
  // }

  // public isStudent(): any {
  //   this.test = false;

  //   this.userService.getUserRole().pipe(
  //     tap(users => {
  //       const role = users.filter((user: any) => user.email == this.authedUser.email)[0].role;
  //       if (role == 'student') {
  //         this.test = true;
  //         // console.log(this.test+'-value')
  //       }
  //     })).subscribe()
  //   // console.log(this.test)
  //   return this.test;
  // }

  public logout() {
    this.afAuth.signOut().then(_ => {
      
      this.isUserLoggedin = false;
      // alert("U clogua");
    });
  }
}
