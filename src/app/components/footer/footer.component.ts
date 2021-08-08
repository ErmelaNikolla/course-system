import { Component, OnInit, Input } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Input() title: string | undefined;
  @Input() menuItems: any;
  @Input() creators: any;
  @Input() address: string | undefined;             
  appComponent: AppComponent;
  
  constructor(appComponent: AppComponent) 
  {
    this.appComponent = appComponent;
  }

  ngOnInit(): void { 
    console.log(this.menuItems)
  }
}
