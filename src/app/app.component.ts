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
    { 'title': 'My courses', 'url': '/courses/id' },
    { 'title': 'Courses', 'url': '/courses' },
    { 'title': 'Create new course', 'url': '/courses/new' }
  ];
  address: string = 'Tirana/Albania';
  creators = ['Ermela Nikolla'];

  constructor(private afAuth: AngularFireAuth) { }
  public isUserLoggedin = false;
  ngOnInit(): void {
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        console.log("😊", res);
        this.isUserLoggedin = true;
      }

    });

  }



  public logout() {
    this.afAuth.signOut().then(val => {
      this.isUserLoggedin = false;
      // alert("U clogua");
    });
  }





}
