import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';

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
  selector: 'app-view-class',
  templateUrl: './view-class.component.html',
  styleUrls: ['./view-class.component.scss']
})
export class ViewClassComponent implements OnInit {

  

  ngOnInit(): void {
    this.createTable();
    setTimeout(() => {
      this.onSearch(this.index);
    }, 3000)
  }

  public classes: any;
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

  constructor(
    private http: HttpClient,
    private modalService: BsModalService,
  ) { 
      this.view = new View(1,this.PAGE_SIZE,"");
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

    onSearchWarning(bodySearch: any): Observable<any>  {
      return this.http.post<any>('http://localhost:8070/api/teacher/get_all_class',bodySearch);
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
      'font-weight':'bold'
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
        { headerName: 'Lớp học', field: 'class_name', cellStyle: this.STYLE_TABLE },
        { headerName: 'Phòng học', field: 'room_name', cellStyle: this.STYLE_TABLE},
        { headerName: 'Giảng viên', field: 'full_name', cellStyle: this.STYLE_TABLE },
        { headerName: 'Mức độ', field: 'level', cellStyle: this.STYLE_TABLE },
        { headerName: 'Sức chứa', field: 'capacity', cellStyle: this.STYLE_TABLE },
        { headerName: 'Ngày bắt đầu', field: 'start_date', cellStyle: this.STYLE_TABLE },
        { headerName: 'Ngày kết thúc', field: 'end_date', cellStyle: this.STYLE_TABLE },
      ];
    }
    index: any;

}
