import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../_common/constants/api';
import { Course } from './course.type';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}

  getCourses() {
    return this.http.get<Course[]>(`${BASE_URL}/admin/get_course`);
  }
}
