import { Component } from '@angular/core';
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
  creators = ['Ermela Nikolla', 'Green Leef'];

  courseValue = '';
  courses :Observable<any[]> | undefined;

  constructor (public db: AngularFireDatabase){
    this.courses = db.list('courses').valueChanges();
  }

  createCourse() {
    this.db.list('courses').push({content: this.courseValue})
    this.courseValue = '';
  }
}
