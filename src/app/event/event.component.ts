import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscriber } from 'rxjs';
import { CellCustomEventComponentComponent } from '../cell-custom-event-component/cell-custom-event-component.component';

export class EventX {
  private name: any;
  private image: any;
  private from_date: any;
  private to_date: any;

  constructor(name: any, image: any, from_date: any, to_date: any) {
    this.name = name;
    this.image = image;
    this.from_date = from_date;
    this.to_date = to_date;
  }
}

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})

export class EventComponent implements OnInit, AfterViewInit {

  myImage!: Observable<any>;
  base64code!: any;
  searchInforForm: any;
  from_date: any;
  to_date: any;


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

  name: any;
  imageUrl: any;
  event: any;

  public teacher: any;
  public view: any;

  constructor(private http: HttpClient,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private toast: ToastrService,
    private changeDetectorRef: ChangeDetectorRef) {
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
    return this.http.post<any>('http://localhost:8070/api/admin/get_event', bodySearch);
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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
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
      { headerName: 'Tên sự kiện', field: 'name', cellStyle: this.STYLE_TABLE },
      {
        headerName: 'Ảnh sự kiện', field: 'image',
        cellRenderer: (params: any) => {
          return `<img src="${params.value}" width="60px" height="80px">`;
        }
        , cellStyle: this.STYLE_IMAGE
      },
      { headerName: 'Ngày bắt đầu', field: 'from_date', cellStyle: this.STYLE_TABLE },
      { headerName: 'Ngày kết thúc', field: 'to_date', cellStyle: this.STYLE_TABLE },
      { headerName: 'Hành động', cellRendererFramework: CellCustomEventComponentComponent, },
    ];
  }


  addEvent() {
    this.event = new EventX(this.name, this.myImage, this.from_date, this.to_date);
    this.http.post<any>('http://localhost:8070/api/admin/add_event', this.event).subscribe(
      response => {
        if (response.state === true) {
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
