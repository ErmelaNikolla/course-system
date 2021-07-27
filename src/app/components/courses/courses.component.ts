import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses :Observable<any[]> | undefined;

  constructor (public db: AngularFireDatabase){
    this.courses = db.list('courses').valueChanges();
  }

  ngOnInit(): void {
  }
  
}
