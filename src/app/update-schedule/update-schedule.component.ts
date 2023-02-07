import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CellCustomUpdateScheduleComponent } from '../cell-custom-update-schedule/cell-custom-update-schedule.component';

export class View {
  private class_id: any;

  constructor(class_id: any) {
    this.class_id = class_id;
  }
}

@Component({
  selector: 'app-update-schedule',
  templateUrl: './update-schedule.component.html',
  styleUrls: ['./update-schedule.component.scss']
})
export class UpdateScheduleComponent implements OnInit {

  constructor(
    private modalService: BsModalService,
    private http: HttpClient,
  ) { }


  ngOnInit(): void {
    this.createTable();
    setTimeout(() => {
      this.onSearch();
    }, 3000)
  }

  rowData: any;

  onSearchWarning(): Observable<any> {
    return this.http.get<any>('http://localhost:8070/api/common/get_all_class');
  }

  onSearch() {
    this.onSearchWarning().subscribe(
      response => {
        this.rowData = response;
      }
    );
  }

  view: any;
  classData: any
  id: any;

  selectClass(id: any){
    this.view = new View(id);
    this.id =id;
    this.http.post<any>('http://localhost:8070/api/admin/get_all_class_by_id',this.view).subscribe(
      response => {
        this.classData = response;
      }
    );
  }

  defaultColDef: any;
  columnDefs: any;

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
      { headerName: 'Slot', field: 'slot_th', cellStyle: this.STYLE_TABLE },
      { headerName: 'Ngày học', field: 'date_study', cellStyle: this.STYLE_TABLE },
      { headerName: 'Slot trong ngày', field: 'slot_of_date', cellStyle: this.STYLE_TABLE },
      { headerName: 'Phòng học', field: 'room_name', cellStyle: this.STYLE_TABLE },
      { headerName: 'Giảng viên', field: 'teacher_name', cellStyle: this.STYLE_TABLE },
      {
        headerName: 'Hành động',
        cellRendererFramework: CellCustomUpdateScheduleComponent,
      },
    ];
  }

}
