import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../_common/constants/api';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

  getQuiz(level: '1' |  '2'| '3') {
    return this.http.post(`${BASE_URL}/aca/get_quiz/${level}`, null);
  }
}
