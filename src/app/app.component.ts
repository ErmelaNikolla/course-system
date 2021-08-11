import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title: string = 'Course System';
  menuItems = [
    { 'title': 'My courses', 'url': '/courses/id', 'component': 'my-courses'},
    { 'title': 'Courses', 'url': '/courses', 'component': 'courses' },
    { 'title': 'Create new course', 'url': '/courses/new', 'component': 'new-course' }
  ];
  address: string = 'Tirana/Albania';
  creators = ['Ermela Nikolla'];
  authedUser:any;

  constructor(private afAuth: AngularFireAuth) { }
  public isUserLoggedin = false;
  ngOnInit(): void {
    this.authedUser = {email:''}
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        console.log("😊", res);
        this.authedUser = res;
        this.isUserLoggedin = true;
      }
    });

  }

  public isAdmin() {
    if(this.authedUser.email === 'admin@course.com')
      return true;
    return false;
  }

  public isLector() {
    if(this.authedUser.email === 'lector@course.com')
      return true;
    return false;
  }

  public isStudent() {
    if(this.authedUser.email === 'student@course.com')
      return true;
    return false;
  }

  public logout() {
    this.afAuth.signOut().then(val => {
      this.isUserLoggedin = false;
      // alert("U clogua");
    });
  }
}
