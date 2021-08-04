import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Course System';
  menuItems = [
    {'title' : 'My courses', 'url' : '/courses/id'}, 
    {'title' : 'Courses', 'url' : '/courses'}, 
    {'title' : 'Create new course', 'url' : '/courses/new'}
  ];
  address: string = 'Tirana/Albania';
  creators = ['Ermela Nikolla'];
  public afAuth: AngularFireAuth;

  constructor(afAuth: AngularFireAuth) {
    this.afAuth = afAuth;
  }

  userLoggedIn() {
    let result = false;
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        result = true;
      } 
    });
    return result;
  }

  userLoggedOut() {
    let result = true;
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        result = false;
      } 
      return result;
    });
  }
}
