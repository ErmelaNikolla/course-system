import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  appComponent:any;

  constructor(appComponent:AppComponent) {
    this.appComponent = appComponent;
   }

  ngOnInit(): void {
  }

}
