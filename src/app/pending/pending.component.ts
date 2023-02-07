import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CellCustomPendingComponent } from '../cell-custom-pending/cell-custom-pending.component';

export class Pending {
  private class_id: any;
  private class_name: any;
  private room_id: any;
  private room_name: any;
  private user_id: any;
  private teacher_id: any;
  private full_name: any;
  private email: any;
  private number_of_student: any;
  private capacity: any;
  private start_date: any;
  private active_room: any;

  constructor(class_id: any, class_name: any, room_id: any, room_name: any, user_id: any, teacher_id: any, full_name: any, email: any, number_of_student: any, capacity: any, start_date: any, active_room: any) {
    this.class_id = class_id;
    this.class_name = class_name;
    this.room_id = room_id;
    this.room_name = room_name;
    this.user_id = user_id;
    this.teacher_id = teacher_id;
    this.full_name = full_name;
    this.email = email;
    this.number_of_student = number_of_student;
    this.capacity = capacity;
    this.start_date = start_date;
    this.active_room = active_room;
  }
}

export class View {
  private page: any;
  private pageSize: any;
  private key_search: any;

  constructor(page: any, pageSize: any, key_search: any) {
    this.page = page;
    this.pageSize = pageSize;
    this.key_search = key_search;
  }
}

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss']
})
export class PendingComponent implements OnInit {

  ngOnInit(): void {
    this.createTable();
    setTimeout(() => {
      this.onSearch(this.index);
    }, 3000)
  }

  public pending: any;
  public view: any;

  class_id: any;
  class_name: any;
  room_id: any;
  room_name: any;
  user_id: any;
  teacher_id: any;
  full_name: any;
  email: any;
  number_of_student: any;
  capacity: any;
  start_date: any;
  active_room: any;

  constructor(private http: HttpClient,
    private modalService: BsModalService,
    private toast: ToastrService) {
    this.pending = new Pending(this.class_id, this.class_name, this.room_id, this.room_name, this.user_id, this.teacher_id, this.full_name, this.email, this.number_of_student, this.capacity, this.start_date, this.active_room);
    this.view = new View(1, this.PAGE_SIZE, "");
  }

  columnDefs: any;
  rowData: any
  modalRef: BsModalRef | undefined;
  searchInforForm: any;
  totalResultSearch: any;
  currentTotalDisplay: any;
  totalPage: any;
  PAGE_SIZE: any = 10;
  defaultColDef: any;
  key: any;
  indexPage: any;
  index: any;

  onSearchWarning(bodySearch: any): Observable<any> {
    return this.http.post<any>('http://localhost:8070/api/admin/get_student_pending', bodySearch);
  }

  onSearch(index: number, btn?: any) {
    let listBtn = document.getElementsByClassName('btn-pag')
    for (let i = 0; i < listBtn.length; i++) {
      const element = listBtn[i];
      element.setAttribute('style', '{color:blue}')
    }
    if (index === null || index === undefined) {
      index = 1;
      const eleSelect = document.getElementById('btn' + (0).toString())
      if (eleSelect) {
        eleSelect!.style.color = "white"
      }
    }
    if (btn) {
      btn.target.style.color = "white"
    } else {
      const eleSelect = document.getElementById('btn' + (index - 1).toString())
      if (eleSelect) {
        eleSelect!.style.color = "white"
      }
    }
    this.indexPage = index;
    this.view = new View(index, this.PAGE_SIZE, this.key);
    this.onSearchWarning(this.view).subscribe(
      response => {
        this.rowData = response.resultData;
        this.totalResultSearch = response.totalRecordNoLimit;
        this.currentTotalDisplay = Object.keys(this.rowData).length;
        this.totalPage = Math.ceil(this.totalResultSearch / this.PAGE_SIZE);
        console.log("????????"+JSON.stringify(response));
      }
    );
  }

  prev(): void {
    if (this.indexPage > 1) {
      this.indexPage--;
    }
    if (this.indexPage < 1) {
      this.indexPage = 1
    }
    this.onSearch(this.indexPage);
  }

  next(): void {
    this.indexPage++;
    if (this.indexPage > this.totalPage) {
      this.indexPage = this.totalPage
    }
    this.onSearch(this.indexPage);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
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
      { headerName: 'Lớp học', field: 'class_name', cellStyle: this.STYLE_TABLE },
      { headerName: 'Email', field: 'email', cellStyle: this.STYLE_TABLE },
      { headerName: 'Số điện thoại', field: 'phone', cellStyle: this.STYLE_TABLE },
      { headerName: 'Ngày bắt đầu', field: 'start_date', cellStyle: this.STYLE_TABLE },
      // {
      //   headerName: 'Thanh toán', field: 'isPaid',
      //   cellRenderer: (params: any) => {
      //     return `<input type='checkbox' ${params.value ? 'checked' : ''} />`;
      //   },
      //   cellStyle: this.STYLE_TABLE
      // },
      {
        headerName: 'Hành động',
        cellRendererFramework: CellCustomPendingComponent,
      },
    ];
  }
}
