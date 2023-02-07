import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../_common/constants/api';
import { Slot } from './slot.type';

@Injectable({
  providedIn: 'root',
})
export class SlotService {
  constructor(private http: HttpClient) {}

  getSlots() {
    return this.http.get<Slot[]>(`${BASE_URL}/admin/get_slot`);
  }
}
