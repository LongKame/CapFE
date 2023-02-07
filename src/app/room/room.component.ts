
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CellCustomRoomComponent } from '../cell-custom-room/cell-custom-room.component';

export class Room {
  private roomname: any;
  private capacity: any;

  constructor(roomname: any, capacity: any) {
    this.roomname = roomname;
    this.capacity = capacity;
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
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  constructor(private http: HttpClient,
    private modalService: BsModalService,
    private toast: ToastrService) {
    this.room = new Room(this.roomname, this.capacity);
    this.view = new View(1, this.PAGE_SIZE, "");
  }

  ngOnInit(): void {
    this.createTable();
    setTimeout(() => {
      this.onSearch(this.index);
    }, 3000)
  }

  public room: any;
  public view: any;


  roomname: any;
  levelId: any;
  capacity: any;

  columnDefs: any;
  rowData: any;
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
    return this.http.post<any>('http://localhost:8070/api/aca/get_room_paging', bodySearch);
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

  // openModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(
  //     template,
  //     Object.assign({}, { class: 'gray modal-lg' })
  //   );
  // }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
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
      { headerName: 'Phòng học', field: 'roomname', cellStyle: this.STYLE_TABLE },
      { headerName: 'Sức chứa', field: 'capacity', cellStyle: this.STYLE_TABLE },
      { headerName: 'Ngày tạo', field: 'createdat', cellStyle: this.STYLE_TABLE },
      { headerName: 'Ngày cập nhật', field: 'updatedat', cellStyle: this.STYLE_TABLE },
      {
        headerName: 'Trạng thái', field: 'active',
        // cellRenderer: function (params: any) {
        //   return params.data.active === true ? "active" : "deactive";
        // },
        cellRenderer: (params: any) => {
          return `<input disabled='true' type='checkbox' ${params.value ? 'checked' : ''} />`;
        },
        cellStyle: this.STYLE_TABLE
      },
      {
        headerName: 'Hành động',
        cellRendererFramework: CellCustomRoomComponent,
      },
    ];
  }

  addRoom() {
    this.room = new Room(this.roomname, this.capacity);
    this.http.post<any>('http://localhost:8070/api/aca/add_room', this.room).subscribe(
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
