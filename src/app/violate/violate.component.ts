import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-violate',
  templateUrl: './violate.component.html',
  styleUrls: ['./violate.component.scss']
})
export class ViolateComponent implements OnInit, AfterViewInit {

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
    return this.http.post<any>('http://localhost:8070/api/admin/get_violate', bodySearch);
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
      { headerName: 'Lỗi vi phạm', field: 'name', cellStyle: this.STYLE_TABLE },
      {
        headerName: 'Ảnh vi phạm', field: 'image',
        cellRenderer: (params: any) => {
          return `<img src="${params.value}" width="60px" height="80px">`;
        }
        , cellStyle: this.STYLE_IMAGE
      },
      { headerName: 'Người vi phạm', field: 'violated_name', cellStyle: this.STYLE_TABLE },
      { headerName: 'Email', field: 'email', cellStyle: this.STYLE_TABLE },
      { headerName: 'Số điện thoại', field: 'phone', cellStyle: this.STYLE_TABLE },
      // { headerName: 'Hành động', cellRendererFramework: CellCustomEventComponentComponent, },
    ];
  }

}
