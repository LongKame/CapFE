import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscriber } from 'rxjs';
import { CellCustomTeacherComponent } from '../cell-custom-teacher/cell-custom-teacher.component';


export class Teacher {
  private username: any;
  private fullname: any;
  private image: any;
  private password: any;
  private code: any;
  private email: any;
  private phone: any;
  private address: any;

  constructor(username: any, fullname: any, image: any, password: any, code: any,email: any, phone: any, address: any) {
    this.username = username;
    this.fullname = fullname;
    this.image = image;
    this.password = password;
    this.code = code;
    this.email = email;
    this.phone = phone;
    this.address = address;
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
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit, AfterViewInit {

  title = 'AdminFE';
  myImage!: Observable<any>;
  base64code!: any;
  searchInforForm: any;


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

  user_name: any;
  full_name: any;
  imageUrl: any;
  password: any;
  code: any;
  email: any;
  phone: any;
  address: any;

  public teacher: any;
  public view: any;

  constructor(private http: HttpClient,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private toast: ToastrService,
    private changeDetectorRef: ChangeDetectorRef) {
    this.teacher = new Teacher(this.user_name, this.full_name, this.imageUrl, this.password, this.code,this.email, this.phone, this.address);
  } ngAfterViewInit(): void {
    this.page(1)
  };

  columnDefs: any;
  rowData: any
  modalRef: BsModalRef | undefined;
  totalResultSearch: any;
  currentTotalDisplay: any;
  totalPage: any;
  PAGE_SIZE: any = 1;
  currentPage = 1;
  defaultColDef: any;
  key: any;
  indexPage: any;

  onSearchWarning(bodySearch: any): Observable<any> {
    return this.http.post<any>('http://localhost:8070/api/admin/get_student', bodySearch);
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
    'font-weight': 'bold',
  }

  STYLE_IMAGE = {
    'font-size': '15px',
    'align-items': 'center',
    'top': '30px',
    'overflow': 'hidden',
    'text-align': 'center',
    'font-weight': 'bold',
    'margin-top': '-30px'
  }

  createTable() {

    this.defaultColDef = {
      sortable: true,
      filter: true,
      editable: true,
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
      {
        headerName: 'Ảnh', field: 'imageUrl',
        cellRenderer: (params: any) => {
          return `<img src="${params.value}" width="60px" height="80px">`;
        }
        , cellStyle: this.STYLE_IMAGE
      },
      { headerName: 'Email', field: 'email', cellStyle: this.STYLE_TABLE },
      { headerName: 'Số điện thoại', field: 'phone', cellStyle: this.STYLE_TABLE },
      { headerName: 'Địa chỉ', field: 'address', cellStyle: this.STYLE_TABLE },
      {
        headerName: 'Trạng thái', field: 'active',
        cellRenderer: (params: any) => {
          return `<input disabled='true' type='checkbox' ${params.value ? 'checked' : ''} />`;
        },
        cellStyle: this.STYLE_TABLE
      },
      { headerName: 'Hành động', cellRendererFramework: CellCustomTeacherComponent, },
    ];
  }

  addTeacher() {
    this.teacher = new Teacher(this.user_name, this.full_name, this.myImage, this.password, this.code, this.email, this.phone, this.address);
    this.http.post<any>('http://localhost:8070/api/admin/add_student', this.teacher).subscribe(
      response => {
        if (response.state === true) {
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

  keyPressUserName(event: any) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  keyPressName(event: any) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  keyPressPhone(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onChange($event: Event) {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    console.log(file);
    this.convertToBase64(file);
  }

  convertToBase64(file: File) {
    const observable = new Observable((subsciber: Subscriber<any>) => {
      this.readFile(file, subsciber)
    })
    observable.subscribe((d) => {
      console.log(d);
      this.myImage = d;
      this.base64code = d;
    })
  }

  readFile(file: File, subsciber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      subsciber.next(filereader.result);
      subsciber.complete();
    }
    filereader.onerror = () => {
      subsciber.error();
      subsciber.complete();
    }
  }
}
