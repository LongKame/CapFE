import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../_common/constants/api';

export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResult = {
  access_token: string;
  role: string;
};

export type UserProfile = {
  fullname: string;
  username: string;
};

export enum UserRole {
  ROLE_TEACHER = 'ROLE_TEACHER',
  ROLE_STUDENT = 'ROLE_STUDENT',
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_ACADEMIC_ADMIN = 'ROLE_ACADEMIC_ADMIN',
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(payload: LoginPayload) {
    return this.http.post<LoginResult>(`${BASE_URL}/login`, null, {
      params: payload,
    });
  }
}
