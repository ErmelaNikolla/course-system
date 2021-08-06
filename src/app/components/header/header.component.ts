import { Component, OnInit, Input } from '@angular/core';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() title: any;
  @Input() menuItems: any;
  @Input() isUserLoggedin: any;
  appComponent: AppComponent;

  constructor(test: AppComponent) {this.appComponent = test }

  ngOnInit(): void {
  }

}
