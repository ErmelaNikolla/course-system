import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from './course';
import { environment } from '../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class CourseService {

    //is it the right one?
    private apiServerUrl = environment.firebase.authDomain;

    constructor(private http: HttpClient) {    }

    public getCourse(courseId: Number): Observable<Course> {
        return this.http.get<Course>(`${this.apiServerUrl}/${courseId}`);
    }

    public getCourses(): Observable<Course[]> {
        return this.http.get<Course[]>(`${this.apiServerUrl}/all`);
    }

    public addCourse(course: Course): Observable<Course> {
        return this.http.post<Course>(`${this.apiServerUrl}/create`, course);
    }

    public updateCourse(course: Course): Observable<Course> {
        return this.http.put<Course>(`${this.apiServerUrl}/update`, course);
    }

    public deleteCourse(courseId: Number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/delete/${courseId}`);
    }

    public enrollCourse(course: Course): Observable<Course> {
        return this.http.post<Course>(`${this.apiServerUrl}/enroll`, course);
    }

}