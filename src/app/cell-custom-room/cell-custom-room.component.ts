import { Component, OnInit, TemplateRef } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { RoomComponent } from '../room/room.component';

export class Room {
  private id: any;
  private roomname: any;
  private capacity: any;
  private active: any;

  constructor(id: any, roomname: any, capacity: any, active: any) {
    this.id = id;
    this.roomname = roomname;
    this.capacity = capacity;
    this.active = active;
  }
}


@Component({
  selector: 'app-cell-custom-room',
  templateUrl: './cell-custom-room.component.html',
  styleUrls: ['./cell-custom-room.component.scss']
})
export class CellCustomRoomComponent implements ICellRendererAngularComp {

  modalRef: BsModalRef | undefined;

  constructor(
    private modalService: BsModalService,
    private http: HttpClient,
    private room: RoomComponent,
    private toast: ToastrService
  ) { }

  public rooms: any;

  data: any;
  params: any;
  user: any;
  course_name: any;

  agInit(params: any): void {
    this.data = params;
    this.params = params;
  }

  refresh(params: any): boolean {
    return false;
  }

  ngOnInit(): void {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  updateRoom() {
    this.rooms = new Room(this.params.data.id,this.params.data.roomname, this.params.data.capacity, this.params.data.active,);
    this.http.put<any>('http://localhost:8070/api/aca/edit_room', this.rooms).subscribe(
      response => {
        if(response.state === true){
          this.room.onSearch(this.room.indexPage);
          this.toast.success("Cập nhật thành công");
          this.modalRef?.hide();
        }
        else{
          this.toast.error("Cập nhật thất bại");
          this.modalRef?.hide();
        }
      }
    )
  }
}
