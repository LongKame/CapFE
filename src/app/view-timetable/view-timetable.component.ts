import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscriber } from 'rxjs';

export class Classes {
  private id: any;

  constructor(id: any) {
    this.id = id;
  }
}

export class Teacher {
  private teacher_Id: any;
  private user_name: any;

  constructor(user_name: any) {
    this.user_name = user_name;
  }
}

export type Option = {
  value: number | string;
  label: string;
};


@Component({
  selector: 'app-view-timetable',
  templateUrl: './view-timetable.component.html',
  styleUrls: ['./view-timetable.component.scss']
})
export class ViewTimetableComponent implements OnInit {

  ngOnInit(): void {
    this.createTable();
    this.onLoadClass();
    setTimeout(() => {
      this.selectedValue(this.indexPage);
    }, 3000)
  }
  public teacher: any;
  public view: any;

  constructor(private http: HttpClient,
    private modalService: BsModalService,
    private toast: ToastrService) {
  };

  columnDefs: any;
  rowData: any
  list_class: any
  defaultColDef: any;
  key: any;
  indexPage: any;
  id: any;
  class_name: any;
  teacher_Id: any;
  user_name: any;
  classOptions: Option[] = [];
  selectedLevel: any;

  onSearchWarning(bodySearch: any): Observable<any> {
    return this.http.post<any>('http://localhost:8070/api/teacher/get_time_table_class', bodySearch);
  }

  selectedValue(id: number){
    this.id=id;
    this.view = new Classes(this.id);
    this.onSearchWarning(this.view).subscribe(
      response => {
        this.rowData = response.time_table;
        console.log("xxxxxxxxxxxxxxxxxxxx"+JSON.stringify(this.rowData));
      }
    );
  }

  onSearchClass(bodySearch: any): Observable<any> {
    return this.http.post<any>('http://localhost:8070/api/teacher/get_class_teacher', bodySearch);
  }

  onLoadClass() {
    this.user_name="giangne";
    this.teacher = new Teacher(this.user_name);
    this.onSearchClass(this.teacher).subscribe(
      response => {
        this.classOptions = response.map((item: any)=> ({ value: item.id, label: item.name }));
      }
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

  createTable() {
    this.defaultColDef = {
      sortable: true,
      filter: true, 
      editable: true,
    };
    this.columnDefs = [
      {
        headerName: 'Slot',
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
      {
        headerName: 'MON', field: 'first_of_week&second_of_week&class_name&room_name',
        cellRenderer: (params: any) => {
          if(params.data.first_of_week==1 || params.data.second_of_week==1){
            params.value=params.data.class_name+" at "+params.data.room_name;
            return params.value;
          }else if(params.data.first_of_week!=1 || params.data.second_of_week!=1){
            params.value="----------------";
            return params.value;
          }
        }
        , cellStyle: this.STYLE_TABLE
      },
      {
        headerName: 'TUE', field: 'first_of_week&second_of_week&class_name&room_name',
        cellRenderer: (params: any) => {
          if(params.data.first_of_week==2 || params.data.second_of_week==2){
            params.value=params.data.class_name+" at "+params.data.room_name;
            return params.value;
          }else if(params.data.first_of_week!=2 || params.data.second_of_week!=2){
            params.value="----------------";
            return params.value;
          }
        }
        , cellStyle: this.STYLE_TABLE
      },
      {
        headerName: 'WED', field: 'first_of_week&second_of_week&class_name&room_name',
        cellRenderer: (params: any) => {
          if(params.data.first_of_week==3 || params.data.second_of_week==3){
            params.value=params.data.class_name+" at "+params.data.room_name;
            return params.value;
          }else if(params.data.first_of_week!=3 || params.data.second_of_week!=3){
            params.value="----------------";
            return params.value;
          }
        }
        , cellStyle: this.STYLE_TABLE
      },
      {
        headerName: 'THU', field: 'first_of_week&second_of_week&class_name&room_name',
        cellRenderer: (params: any) => {
          if(params.data.first_of_week==4 || params.data.second_of_week==4){
            params.value=params.data.class_name+" at "+params.data.room_name;
            return params.value;
          }else if(params.data.first_of_week!=4 || params.data.second_of_week!=4){
            params.value="----------------";
            return params.value;
          }
        }
        , cellStyle: this.STYLE_TABLE
      },
      {
        headerName: 'FRI', field: 'first_of_week&second_of_week&class_name&room_name',
        cellRenderer: (params: any) => {
          if(params.data.first_of_week==5 || params.data.second_of_week==5){
            params.value=params.data.class_name+" at "+params.data.room_name;
            return params.value;
          }else if(params.data.first_of_week!=5 || params.data.second_of_week!=5){
            params.value="----------------";
            return params.value;
          }
        }
        , cellStyle: this.STYLE_TABLE
      },
      {
        headerName: 'SAT', field: 'first_of_week&second_of_week&class_name&room_name',
        cellRenderer: (params: any) => {
          if(params.data.first_of_week==6 || params.data.second_of_week==6){
            params.value=params.data.class_name+" at "+params.data.room_name;
            return params.value;
          }else if(params.data.first_of_week!=6 || params.data.second_of_week!=6){
            params.value="----------------";
            return params.value;
          }
        }
        , cellStyle: this.STYLE_TABLE
      },
      {
        headerName: 'SUN', field: 'first_of_week&second_of_week&class_name&room_name',
        cellRenderer: (params: any) => {
          if(params.data.first_of_week==7 || params.data.second_of_week==7){
            params.value=params.data.class_name+" at "+params.data.room_name;
            return params.value;
          }else if(params.data.first_of_week!=7 || params.data.second_of_week!=7){
            params.value="----------------";
            return params.value;
          }
        }
        , cellStyle: this.STYLE_TABLE
      },
    ];
  }
}
