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
  creators = ['Ermela Nikolla'];
}
