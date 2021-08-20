import { AppComponent } from 'src/app/app.component';
import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() title: any;
  @Input() menuItems: any;
  // @Input() menuItems2: any;
  @Input() isUserLoggedin: any;

  appComponent: AppComponent;
  constructor 
  
  (private afAuth: AngularFireAuth, appComponent: AppComponent) {this.appComponent = appComponent; }
  
  ngOnInit(): void {
  }

  public logout() {
    this.afAuth.signOut().then(_ => {
      this.isUserLoggedin = false;
      
      // alert("U clogua");
    });
  }

}
