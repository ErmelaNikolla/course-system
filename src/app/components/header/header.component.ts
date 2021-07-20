import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string = 'Course System';
  menuItems = [
    {'title' : 'My courses', 'url' : '/courses/id'}, 
    {'title' : 'Courses', 'url' : '/courses'}, 
    {'title' : 'Create new course', 'url' : '/courses/new'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
