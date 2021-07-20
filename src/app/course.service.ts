import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Course} from './course';

@Injectable({
    providedIn: 'root'
})
export class CourseService {

    //to be determined from firebase
    private apiServerUrl = 'http://localhost:8080/api/v1/course';

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

}