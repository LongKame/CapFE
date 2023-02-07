import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit,OnInit, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { CellCustomStudentComponent } from '../cell-custom-student/cell-custom-student.component';

export class Class {
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
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit, AfterViewInit {

  ngOnInit(): void {
    this.createTable();
    setTimeout(() => {
      this.page(this.currentPage);
    }, 2000),
      this.searchInforForm = this.formBuilder.group({
        key_search: '',
        page: this.currentPage,
        pageSize: this.PAGE_SIZE,
      });
  }

  public academicadmin: any;
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
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private toast: ToastrService,
    private changeDetectorRef: ChangeDetectorRef) {
    this.academicadmin = new Class(this.class_id, this.class_name, this.room_id, this.room_name, this.user_id, this.teacher_id, this.full_name, this.email, this.number_of_student, this.capacity, this.start_date, this.active_room);
    this.view = new View(1, this.PAGE_SIZE, "");
  }ngAfterViewInit(): void {
    this.page(1)
  };




  columnDefs: any;
  rowData: any
  modalRef: BsModalRef | undefined;
  searchInforForm: any;
  totalResultSearch: any;
  currentTotalDisplay: any;
  totalPage: any;
  PAGE_SIZE: any = 10;
  currentPage = 1;
  defaultColDef: any;
  key: any;
  indexPage: any;
  index: any;

  onSearchWarning(bodySearch: any): Observable<any> {
    return this.http.post<any>('http://localhost:8070/api/admin/search_student', bodySearch);
  }

  rangeWithDots: any;
  first: number = 1;
  last: number = 10;

  pagination(current: any, last: any) {
    var delta = 2,
      left = current - delta,
      right = current + delta + 1,
      range = [],
      rangeWithDots = [],
      l;

    for (let i = 1; i <= last; i++) {
      if (i == 1 || i == last || (i >= left && i < right)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }
    return rangeWithDots;
  }

  onSearch() {
    this.onSearchWarning(this.searchInforForm.value).subscribe(
      response => {
        this.rowData = response.resultData;
        this.totalResultSearch = response.totalRecordNoLimit;
        this.currentTotalDisplay = Object.keys(this.rowData).length;
        this.totalPage = Math.ceil(this.totalResultSearch / this.PAGE_SIZE);
        this.rangeWithDots = this.pagination(this.currentPage, this.totalPage);
        if (Object.keys(this.rowData).length === 0) {
          this.first = 0;
        } else {
          this.first = (this.PAGE_SIZE * (this.currentPage - 1)) + 1
        }
        this.last = Object.keys(this.rowData).length + (this.PAGE_SIZE * (this.currentPage - 1))
        this.changeDetectorRef.detectChanges()
      }
    );
  }

  prev(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    if (this.currentPage < 1) {
      this.currentPage = 1
    }
    this.page(this.currentPage);
  }

  state: boolean = true;

  next(): void {
    this.currentPage++;
    if (this.currentPage > this.totalPage) {
      this.currentPage = this.totalPage
    }
    this.state = true;
    this.page(this.currentPage);
  }

  page(page: number, btn?: any): void {
    let listBtn = document.getElementsByClassName('btn-pag')
    for (let i = 0; i < listBtn.length; i++) {
      const element = listBtn[i];
      element.setAttribute('style', 'color:black')
    }
    if (page === 1) {
      const ele = document.getElementById('btn1')
      try {
        ele!.style.color = 'white'
      } catch (error) {
      }
    }
    if (page === null || page === undefined) {
      page = 1;
      const eleSelect = document.getElementById('btn' + (0).toString())
      if (eleSelect) {
        eleSelect!.style.color = "white"
      }
    }
    if (btn) {
      btn.target.style.color = "white"
    }
    if (this.state) {
      const eleSelect = document.getElementById('btn' + (page).toString())
      if (eleSelect) {
        eleSelect!.style.color = "white"
      }
    }
    if ((btn === null || btn === undefined) && !this.state) {
      const eleSelect = document.getElementById('btn' + (page - 1).toString())
      if (eleSelect) {
        eleSelect!.style.color = "white"
      }
    }
    this.currentPage = page;
    this.searchInforForm.controls.page.setValue(this.currentPage);
    this.onSearch();
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
      { headerName: 'Tên tài khoản', field: 'user_name', cellStyle: this.STYLE_TABLE },
      { headerName: 'Tên người dùng', field: 'full_name', cellStyle: this.STYLE_TABLE },
      { headerName: 'Email', field: 'email', cellStyle: this.STYLE_TABLE },
      { headerName: 'Số điện thoại', field: 'phone', cellStyle: this.STYLE_TABLE },
      {headerName: 'Địa chỉ', field: 'address', cellStyle: this.STYLE_TABLE },
      {
        headerName: 'Trạng thái', field: 'active',
        cellRenderer: (params: any) => {
          return `<input disabled='true' type='checkbox' ${params.value ? 'checked' : ''} />`;
        },
        cellStyle: this.STYLE_TABLE
      },
      {
        headerName: 'Hành động',
        cellRendererFramework: CellCustomStudentComponent,
      },
    ];
  }


}
