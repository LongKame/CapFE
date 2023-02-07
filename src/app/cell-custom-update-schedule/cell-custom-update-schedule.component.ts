import { Component, OnInit, TemplateRef } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { UpdateScheduleComponent } from '../update-schedule/update-schedule.component';
import { DatePipe } from '@angular/common';

export class ClassSchedule {
  private class_schedule_id: any;
  private teacher_id: any;
  private class_id: any;
  private slot_th: any;
  private date: any;
  private room_id: any;
  private slot_of_date: any;

  constructor(class_schedule_id: any, teacher_id: any, class_id: any, slot_th: any, date: any, room_id: any, slot_of_date: any) {
    this.class_schedule_id = class_schedule_id;
    this.teacher_id = teacher_id;
    this.class_id = class_id;
    this.slot_th = slot_th;
    this.date = date;
    this.room_id = room_id;
    this.slot_of_date = slot_of_date;
  }
}

export type Option = {
  value: number | string;
  label: string;
};

@Component({
  selector: 'app-cell-custom-update-schedule',
  templateUrl: './cell-custom-update-schedule.component.html',
  styleUrls: ['./cell-custom-update-schedule.component.scss']
})
export class CellCustomUpdateScheduleComponent implements ICellRendererAngularComp {

  modalRef: BsModalRef | undefined;
  myImage!: Observable<any>;
  base64code!: any;

  constructor(
    private modalService: BsModalService,
    private http: HttpClient,
    private toast: ToastrService,
    private updateChedule: UpdateScheduleComponent,
    private datePipe: DatePipe
  ) { }

  closeResult: string = "";
  data: any;
  params: any;
  classSchedule: any;

  agInit(params: any): void {
    this.data = params;
    this.params = params;
  }

  refresh(params: any): boolean {
    return false;
  }

  roomOptions: any;
  teacherOptions: any;
  roomId: any;
  teacherId: any;
  study_date: any;
  study_date_update: any;

  ngOnInit(): void {
    this.http.get<any>('http://localhost:8070/api/admin/get_rooms').subscribe(res => {
      this.roomOptions = res.map((item: any) => ({ value: item.id, label: item.roomname }));
    });
    this.http.get<any>('http://localhost:8070/api/admin/get_teachers').subscribe(res => {
      this.teacherOptions = res.map((item: any) => ({ value: item.teacher_Id, label: item.full_name }));
    });
  }

  transformDate() {
    var newDate = this.params.data.date_study[3]+this.params.data.date_study[4]+this.params.data.date_study[2]+this.params.data.date_study[0]+this.params.data.date_study[1]
    +this.params.data.date_study[5]+this.params.data.date_study[6]+this.params.data.date_study[7]+this.params.data.date_study[8]+this.params.data.date_study[9];
    this.study_date = this.datePipe.transform(newDate, 'yyyy-MM-dd');
    return this.study_date;
  }

  transformDateUpdate(date: any) {
    this.study_date_update = this.datePipe.transform(date, 'dd-MM-yyyy');
    return this.study_date_update;
  }

  openModal(template: TemplateRef<any>) {
    this.roomId = this.roomOptions.find((i: any) => i.value === this.params.data.room_id);
    this.teacherId = this.teacherOptions.find((i: any) => i.value === this.params.data.teacher_id);
    this.transformDate();
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  updateSchedule() {
    this.transformDateUpdate(this.study_date);
    this.classSchedule = new ClassSchedule(this.params.data.class_schedule_id, this.teacherId.value, null, this.params.data.slot_th, this.study_date_update, this.roomId.value, this.params.data.slot_of_date);
    console.log("uuuu" + JSON.stringify(this.classSchedule));
    this.http.put<any>('http://localhost:8070/api/common/update_slot', this.classSchedule).subscribe(
      response => {
        if (response.state === true) {
          this.updateChedule.selectClass(this.updateChedule.id);
          this.toast.success("Cập nhật thành công");
          this.modalRef?.hide();
        }
        else {
          this.toast.error("Cập nhật thất bại");
          this.modalRef?.hide();
        }
      }
    )
  }
}