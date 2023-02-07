import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TokenService } from '../_services/token.service';
import { CellCustomCheckAttendanceComponent } from '../cell-custom-check-attendance/cell-custom-check-attendance.component';

export class Teacher {
  private user_name: any;

  constructor(user_name: any) {
    this.user_name = user_name;
  }
}

export class View {
  private class_id: any;

  constructor(class_id: any) {
    this.class_id = class_id;
  }
}

@Component({
  selector: 'app-check-attendance',
  templateUrl: './check-attendance.component.html',
  styleUrls: ['./check-attendance.component.scss']
})
export class CheckAttendanceComponent implements OnInit {

  constructor(
    private tokenService: TokenService,
    private http: HttpClient,) { }

  ngOnInit(): void {
    this.createTable();
    setTimeout(() => {
      this.onSearch();
    }, 1000)
  }

  view: any;
  classData: any
  id: any;
  teacher: any;
  rowData: any;
  slotData: any;
  defaultColDef: any;
  columnDefs: any;
  sub_id: any;

  onSearchWarning(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:8070/api/teacher/get_class_teacher', data);
  }

  onSearch() {
    this.teacher = new Teacher(this.tokenService.getUserProfile()?.username);
    this.onSearchWarning(this.teacher).subscribe(
      response => {
        this.rowData = response;
      }
    );
  }

  selectClass(id: any) {
    this.sub_id = id;
    this.view = new View(id);
    this.http.post<any>('http://localhost:8070/api/common/get_all_class_by_id', this.view).subscribe(
      response => {
        this.slotData = response;
        // console.log(response);
      }
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
      { headerName: 'Buổi học', field: 'slot_th', cellStyle: this.STYLE_TABLE },
      { headerName: 'Ngày học', field: 'date_study', cellStyle: this.STYLE_TABLE },
      { headerName: 'Slot', field: 'slot_of_date', cellStyle: this.STYLE_TABLE },
      {
        headerName: "Điểm danh",
        cellRendererFramework: CellCustomCheckAttendanceComponent,
      },
    ];
  }

}
