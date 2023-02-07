import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../_common/constants/api';
import { Room } from './room.type';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private http: HttpClient) {}

  getRooms() {
    return this.http.get<Room[]>(`${BASE_URL}/admin/get_room`);
  }
}
