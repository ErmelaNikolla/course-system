import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './components/courses/courses.component';
import { NewCourseComponent } from './components/new-course/new-course.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';

const routes: Routes = [
  { path: 'new-course', component: NewCourseComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'my-courses', component: MyCoursesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
