import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CellCustomCourseComponent } from '../cell-custom-course/cell-custom-course.component';

export class Course {
  private name: any;
  private levelId: any;
  private createdAt: any;
  private updatedAt: any;
  private numberSlot: any;
  private fee: any;

  constructor(name: any, levelId: any, createdAt: any, updatedAt: any, numberSlot: any, fee: any) {
    this.name = name;
    this.levelId = levelId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.numberSlot = numberSlot;
    this.fee = fee;
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
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  constructor(private http: HttpClient,
    private modalService: BsModalService,
    private toast: ToastrService) {
    this.course = new Course(this.course_name, this.levelId, this.createdAt, this.updatedAt, this.number_slot, this.fee);
    this.view = new View(1, this.PAGE_SIZE, "");
  }

  ngOnInit(): void {
    this.createTable();
    setTimeout(() => {
      this.onSearch(this.index);
    }, 3000)
  }

  public course: any;
  public view: any;

  course_name: any;
  levelId: any;
  createdAt: any;
  updatedAt: any;
  number_slot: any;
  fee: any;

  columnDefs: any;
  rowData: any;
  modalRef: BsModalRef | undefined;
  searchInforForm: any;
  totalResultSearch: any;
  currentTotalDisplay: any;
  totalPage: any;
  PAGE_SIZE: any = 5;
  defaultColDef: any;
  key: any;
  indexPage: any;
  index: any;

  onSearchWarning(bodySearch: any): Observable<any> {
    return this.http.post<any>('http://localhost:8070/api/aca/get_course_paging', bodySearch);
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
      { headerName: 'Khóa học', field: 'course_name', cellStyle: this.STYLE_TABLE },
      { headerName: 'Học phí', field: 'fee', cellStyle: this.STYLE_TABLE },
      { headerName: 'Mức độ', field: 'level', cellStyle: this.STYLE_TABLE },
      { headerName: 'Ngày tạo', field: 'createdAt', cellStyle: this.STYLE_TABLE },
      { headerName: 'Ngày cập nhật', field: 'updatedAt', cellStyle: this.STYLE_TABLE },
      { headerName: 'Số buổi học', field: 'numberSlot', cellStyle: this.STYLE_TABLE },
      {
          headerName: "Hành động",
          cellRendererFramework: CellCustomCourseComponent,
        },
    ];
  }

  keyPressFee(event: any) {
    const pattern = /[0-9\+\.\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  addCourse() {
    this.course = new Course(this.course_name, this.levelId, null, null, this.number_slot, this.fee);
    this.http.post<any>('http://localhost:8070/api/aca-admin/add_course', this.course).subscribe(
      response => {
        if (response.state === true) {
          this.onSearch(this.indexPage);
          this.toast.success("Thêm thành công");
          this.modalRef?.hide();
        }
        else {
          this.toast.error("Thêm thất bại");
          this.modalRef?.hide();
        }
      }
    )
  }
}
