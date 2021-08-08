import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from './course';
// import { MyCourses} from './mycourses';
// import { NewCourses } from './newcourses';
import { environment } from '../environments/environment';
import { NgForm } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
    providedIn: 'root'
})
export class CourseService {

    //is it the right one?
    private apiServerUrl = environment.firebase.authDomain;
    delete: any;
    

    // constructor(private http: HttpClient) {    }
    constructor() {    }

    public getCourse(courseId: Number): void {
        // return this.http.get<Course>(`${this.apiServerUrl}/${courseId}`);
    }

    public getCourses(): void {
        // return this.http.get<Course[]>(`${this.apiServerUrl}/all`);
    }

    public addCourse(addForm: NgForm, db: AngularFireDatabase): void {
        db.list('courses').push({name: addForm.value.name, credit: addForm.value.credit, lector:addForm.value.lector});
    }

    public updateCourse(editForm: NgForm, db: AngularFireDatabase,id :string): void {
        //todo - fix to update based on the identifier/id of the entry on the list in firebase
        // db.list('courses').db.list({name: editForm.value.name, credit: editForm.value.credit, lector:editForm.value.lector});
        //  console.log ("key", key);
   db.list("courses").update(id,{name: editForm.value.name, credit: editForm.value.credit, lector:editForm.value.lector})

   
    }

    public deleteCourse(id: string, db:AngularFireDatabase): void {
        //  return this.delete<void>(`${this.apiServerUrl}/delete/${courseId}`);
        console.log('you are here')
        const itemsRef = db.list('courses');
        itemsRef.remove(id);
    }

    public enrollCourse(course: Course): void {
        // return this.http.post<Course>(`${this.apiServerUrl}/enroll`, course);
    }

}