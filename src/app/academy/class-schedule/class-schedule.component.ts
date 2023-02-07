import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

export class View {
  private class_id: any;

  constructor(class_id: any) {
    this.class_id = class_id;
  }
}


@Component({
  selector: 'app-class-schedule',
  templateUrl: './class-schedule.component.html',
  styleUrls: ['./class-schedule.component.scss']
})
export class ClassScheduleComponent implements OnInit {

  constructor(
    private modalService: BsModalService,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.onSearch();
    }, 3000)
  }

  rowData: any;
  view: any;
  classData: any;

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
    this.http.post<any>('http://localhost:8070/api/common/get_all_class_by_id',this.view).subscribe(
      response => {
        this.classData = response;
      }
    );
  }
}

