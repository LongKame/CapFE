import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

export class View {
  private class_id: any;

  constructor(class_id: any) {
    this.class_id = class_id;
  }
}

@Component({
  selector: 'app-view-students-in-all-classes',
  templateUrl: './view-students-in-all-classes.component.html',
  styleUrls: ['./view-students-in-all-classes.component.scss']
})
export class ViewStudentsInAllClassesComponent implements OnInit {

  constructor(private modalService: BsModalService,
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
  
    selectClass(id: any){
      this.view = new View(id);
      this.id =id;
      this.http.post<any>('http://localhost:8070/api/admin/view_student_class',this.view).subscribe(
        response => {
          this.studentData = response;
          // console.log(this.rowData);
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
