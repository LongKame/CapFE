import { Component, OnInit, TemplateRef } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { ToastrService } from 'ngx-toastr';
import { HomeComponent } from '../pages/home/home.component';
import { StudentComponent } from '../student/student.component';
import { Observable } from 'rxjs';
import { Option } from '../_common/types/option';

export class Student {
  private student_Id: any;
  private user_Id: any;
  private role_Id: any;

  constructor(student_Id: any, user_Id: any, role_Id: any) {
    this.student_Id = student_Id;
    this.user_Id = user_Id;
    this.role_Id = role_Id;
  }
}

@Component({
  selector: 'app-cell-custom-student',
  templateUrl: './cell-custom-student.component.html',
  styleUrls: ['./cell-custom-student.component.scss']
})
export class CellCustomStudentComponent implements ICellRendererAngularComp {

  modalRef: BsModalRef | undefined;

  constructor(
    private modalService: BsModalService,
    private http: HttpClient,
    private app: AppComponent,
    private home: HomeComponent,
    private student: StudentComponent,
    private toast: ToastrService
  ) { }

  data: any;
  params: any;
  user: any;
  courses: any;
  classes: any;
  stu: any;
  classOptions: Option[] = [];

  agInit(params: any): void {
    this.data = params;
    this.params = params;
  }

  refresh(params: any): boolean {
    return false;
  }

  onSearchWarning(): Observable<any> {
    return this.http.get<any>('http://localhost:8070/api/common/get_class');
  }

  ngOnInit(): void {
    this.onSearchWarning().subscribe(res => {
      this.classOptions = res.map((item: any) => ({ value: item.id, label: item.name}));
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  openModalDelete(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  keyPressName(event: any) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  deleteStudent() {
    this.stu = new Student(null,this.params.data.user_Id,null);
    this.http.put<any>('http://localhost:8070/api/admin/delete_student', this.stu).subscribe(
      response => {
        if (response.state === true) {
          // this.student.onSearch(this.stu.indexPage);
          this.toast.success("Xóa thành công");
          this.modalRef?.hide();
        }
        else {
          this.toast.error("Xóa thất bại");
          this.modalRef?.hide();
        }
      }
    )
  }
}
