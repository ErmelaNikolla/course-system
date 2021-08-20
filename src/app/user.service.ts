import { User } from './user';
import { AppComponent } from 'src/app/app.component';
import { Injectable } from '@angular/core';
import { Course } from './course';
import { environment } from '../environments/environment';
import { NgForm } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { delay, filter, map, tap } from "rxjs/operators";
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
// import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServerUrl = environment.firebase.authDomain;
  db: AngularFireDatabase;

  constructor(db: AngularFireDatabase) {
    this.db = db;
  }

  public getUserRole(): Observable<any> {
    return this.db.list('users').valueChanges();
    //snapshotChanges
  }

  private wait(ms: any) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }
}