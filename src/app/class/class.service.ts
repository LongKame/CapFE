import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../_common/constants/api';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  constructor(private http: HttpClient) {}

  addClass(payload: object) {
    return this.http.post(`${BASE_URL}/admin/add_class`, payload);
  }
}
