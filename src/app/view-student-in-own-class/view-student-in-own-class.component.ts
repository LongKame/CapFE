import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../_services/token.service';

export class View {
  private class_id: any;

  constructor(class_id: any) {
    this.class_id = class_id;
  }
}

export class Teacher {
  private user_name: any;

  constructor(user_name: any) {
    this.user_name = user_name;
  }
}

@Component({
  selector: 'app-view-student-in-own-class',
  templateUrl: './view-student-in-own-class.component.html',
  styleUrls: ['./view-student-in-own-class.component.scss']
})
export class ViewStudentInOwnClassComponent implements OnInit {

  constructor(
    private tokenService: TokenService,
    private http: HttpClient,) { }

    ngOnInit(): void {
      this.createTable();
      setTimeout(() => {
        this.onSearch();
      }, 3000)
    }
  
    rowData: any;
    view: any;
    studentData: any
    id: any;
    defaultColDef: any;
    columnDefs: any;
    teacher: any;
  
    onSearchWarning(data: any): Observable<any> {
      return this.http.post<any>('http://localhost:8070/api/teacher/get_class_teacher',data);
    }
  
    onSearch() {
      this.teacher = new Teacher(this.tokenService.getUserProfile()?.username);
      this.onSearchWarning(this.teacher).subscribe(
        response => {
          this.rowData = response;
        }
      );
    }
  
    selectClass(id: any){
      this.view = new View(id);
      this.id =id;
      this.http.post<any>('http://localhost:8070/api/teacher/view_student_class',this.view).subscribe(
        response => {
          this.studentData = response;
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
        { headerName: 'Tên người dùng', field: 'full_name', cellStyle: this.STYLE_TABLE },
        { headerName: 'Số điện thoại', field: 'phone', cellStyle: this.STYLE_TABLE },
        { headerName: 'Email', field: 'email', cellStyle: this.STYLE_TABLE },
        {headerName: 'Địa chỉ', field: 'address', cellStyle: this.STYLE_TABLE },
      ];
    }
}

