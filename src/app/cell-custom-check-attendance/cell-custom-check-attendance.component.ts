import { Component, OnInit, TemplateRef } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CheckAttendanceComponent } from '../check-attendance/check-attendance.component';

export class View {
  private class_id: any;
  private slot_id: any;

  constructor(class_id: any, slot_id: any) {
    this.class_id = class_id;
    this.slot_id = slot_id;
  }
}

export class Attend {
  constructor(
    class_id: number,
    student_id: number,
    class_schedule_id: number,
    state: any
  ) { }
}

@Component({
  selector: 'app-cell-custom-check-attendance',
  templateUrl: './cell-custom-check-attendance.component.html',
  styleUrls: ['./cell-custom-check-attendance.component.scss']
})
export class CellCustomCheckAttendanceComponent implements ICellRendererAngularComp {

  constructor(
    private modalService: BsModalService,
    private http: HttpClient,
    private toast: ToastrService,
    private checkAttend: CheckAttendanceComponent,
  ) { }

  modalRef: BsModalRef | undefined;
  closeResult: string = "";
  data: any;
  params: any;
  classSchedule: any;
  view: any;
  studentData: any;
  defaultColDef: any;
  columnDefs: any;
  list: any = [];
  list1: any = [];
  list3: any = [];
  listAttennd: any = [];
  listFinal: any;
  class_schedule_id: any;

  openModal(template: TemplateRef<any>, num: any) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg', })
    );
    this.class_schedule_id = num;
    this.selectClass();
  }

  agInit(params: any): void {
    this.data = params;
    this.params = params;
  }

  refresh(params: any): boolean {
    return false;
  }

  ngOnInit(): void {
    this.createTable();
    setTimeout(() => {
    }, 3000)
  }

  selectClass() {
    console.log("??" + this.checkAttend.sub_id + " " + this.class_schedule_id);
    this.view = new View(this.checkAttend.sub_id, this.class_schedule_id);
    console.log("??" + JSON.stringify(this.view));
    this.http.post<any>('http://localhost:8070/api/common/view_student_class', this.view).subscribe(
      response => {
        this.studentData = response;
        console.log(response);
      }
    );
  }

  checkValue(event: boolean, student_id: any) {
    this.list1.push({ student_id: student_id, class_schedule_id: this.params.data.class_schedule_id, state: event });
    console.log("list1"+JSON.stringify(this.list1));
    this.list.push({ student_id: student_id, class_schedule_id: this.params.data.class_schedule_id, state: event });
    
    console.log(this.list);
    console.log(student_id + " " + this.params.data.class_schedule_id + " " + event);
    this.list1 = [];
  }

  saveAttend() {

    const set2 = new Set();
    this.list = this.list.reverse();
    this.list = this.list.sort((a: any, b: any) => (a.student_id > b.student_id ? -1 : 1));

    this.list.filter((i: any) => {
      if (!set2.has(i.student_id)) {
        this.list3.push({ student_id: i.student_id, class_schedule_id: i.class_schedule_id, state: i.state });
        set2.add(i.student_id);
      }
    })
    this.list = this.list3;

    console.log("xxxxxxxxxxxxxxx" + JSON.stringify(this.list));

    const set = new Set();
    const set1 = new Set();
    this.list.filter((i: any) => {
      for (const j of this.studentData) {
        if (i.student_id == j.student_id) {
          if (!set1.has(i.student_id)) {
            this.listAttennd.push({ classId: this.checkAttend.sub_id, slotId: this.params.data.class_schedule_id, studentId: i.student_id, state: true });
            set1.add(i.student_id);
          }
        }
      }
    })

    console.log("oooooooooooooo" + JSON.stringify(this.listAttennd));

    this.listAttennd.filter((i: any) => {
      for (const j of this.studentData) {
        if (i.student_id != j.student_id && j.state != true) {
          if (!set.has(j.student_id)) {
            this.listAttennd.push({ classId: this.checkAttend.sub_id, slotId: this.params.data.class_schedule_id, studentId: j.student_id, state: false });
            set.add(j.student_id)
          }
        }
      }
    })

    this.listAttennd = this.listAttennd.sort((a: any, b: any) => (a.studentId < b.studentId ? -1 : 1));

    console.log("yyyyyyyyy" + JSON.stringify(this.listAttennd));

    // this.http.post<any>('http://localhost:8070/api/teacher/check_attendance', this.listAttennd).subscribe(
    //   response => {
    //     if(response.state === true){
    //       this.checkAttend.onSearch();
    //       this.toast.success(response.message);
    //       this.modalRef?.hide();
    //     }
    //     else{
    //       this.toast.error(response.message);
    //       this.modalRef?.hide();
    //     }
    //   }
    // );

    this.listAttennd = [];
    this.list = [];
    this.list3 = [];

  }

  STYLE_TABLE = {
    'font-size': '15px',
    'align-items': 'center',
    'top': '30px',
    'overflow': 'hidden',
    'text-align': 'center',
    'font-weight': 'bold'
  }

  createTable() {

    this.defaultColDef = {
      sortable: true,
      filter: true
    };

    this.columnDefs = [
      {
        headerName: 'Số thứ tự',
        valueGetter: (params: any) => {
          if (params.node.rowIndex == 0) {
            return params.node.rowIndex = 1;
          } else {
            params.node.rowIndex++;
            return params.node.rowIndex++;
          }
        }
        , cellStyle: this.STYLE_TABLE
      },
      { headerName: 'Tên người dùng', field: 'full_name', cellStyle: this.STYLE_TABLE },
      { headerName: 'Số điện thoại', field: 'phone', cellStyle: this.STYLE_TABLE },
      { headerName: 'Địa chỉ', field: 'address', cellStyle: this.STYLE_TABLE },

    ];
  }

}
