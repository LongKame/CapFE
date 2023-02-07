import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { CellCustomCurriculumComponent } from '../cell-custom-curriculum/cell-custom-curriculum.component';

export class Curriculum {
  private courseId: any;
  private name: any;
  private linkURL: any;
  private description: any;

  constructor(courseId: any, name: any, linkURL: any, description: any) {
    this.courseId = courseId;
    this.name = name;
    this.linkURL = linkURL;
    this.description = description;
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
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss']
})
export class CurriculumComponent implements OnInit {

  constructor(private http: HttpClient,
    private modalService: BsModalService,
    private toast: ToastrService,
    private fb: FormBuilder,) {
    this.curriculum = new Curriculum(this.courseId, this.name, this.linkURL, this.description);
    this.view = new View(1, this.PAGE_SIZE, "");
  }

  ngOnInit(): void {
    this.createTable();
    this.http.get<any>('http://localhost:8070/api/aca/get_course').subscribe(res => {
      this.courseOptions = res.map((item: any) => ({ value: item.id, label: item.name }));
    });
    setTimeout(() => {
      this.onSearch(this.index);
    }, 3000)

    this.form = this.fb.group({
      courseId: [null, []],
      name: [null, []],
      linkURL: [null, []],
      description: [null, []],
    });
  }

  public curriculum: any;
  public view: any;
  PAGE_SIZE: any = 10;
  courseId: any;
  name: any;
  linkURL: any;
  description: any;
  courseOptions: any;
  columnDefs: any;
  rowData: any;
  modalRef: BsModalRef | undefined;
  searchInforForm: any;
  totalResultSearch: any;
  currentTotalDisplay: any;
  totalPage: any;
  defaultColDef: any;
  key: any;
  indexPage: any;
  index: any;
  form!: FormGroup;
  curri: any;

  onSearchWarning(bodySearch: any): Observable<any> {
    return this.http.post<any>('http://localhost:8070/api/aca/get_curriculum_paging', bodySearch);
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
      { headerName: 'Tài liệu', field: 'curriculum_name', cellStyle: this.STYLE_TABLE },
      {
        headerName: 'Liên kết', field: 'link_url',
        cellRenderer: (params: any) => {
          return `<a href="${params.value}">${params.value}</a>`;
        }
        , cellStyle: this.STYLE_TABLE
      },
      { headerName: 'Mô tả', field: 'description', cellStyle: this.STYLE_TABLE },
      { headerName: 'Ngày tạo', field: 'created_at', cellStyle: this.STYLE_TABLE },
      { headerName: 'Ngày cập nhật', field: 'updated_at', cellStyle: this.STYLE_TABLE },
      { headerName: 'Khóa học', field: 'course_name', cellStyle: this.STYLE_TABLE },
      {
        headerName: "Hành động",
        cellRendererFramework: CellCustomCurriculumComponent,
      },
    ];
  }

  onAddClass() {
    const values = this.form.getRawValue();
    const payload = {
      ...values,
      courseId: +values.courseId,
    };

    this.curri = new Curriculum(payload.courseId, payload.name, payload.linkURL, payload.description);
    this.http.post<any>('http://localhost:8070/api/aca/add_curriculum', this.curri).subscribe(
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
