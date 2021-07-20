import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  title: string = 'Course System';
  menuItems = [
    {'title' : 'My courses', 'url' : '/courses/id'}, 
    {'title' : 'Courses', 'url' : '/courses'}, 
    {'title' : 'Create new course', 'url' : '/courses/new'}
  ];
  address: string = 'Tirana/Albania';
  creators = ['Ermela Nikolla', 'Green Leef'];
  
  constructor() { }

  ngOnInit(): void { }
}
