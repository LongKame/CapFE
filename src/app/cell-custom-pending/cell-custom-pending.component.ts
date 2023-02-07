import { Component, OnInit, TemplateRef } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PendingComponent } from '../pending/pending.component';
import { Option } from '../_common/types/option';

export class View {
  private class_id: any;

  constructor(class_id: any) {
    this.class_id = class_id;
  }
}

export class Classes {
  private courseId: any;

  constructor(courseId: any) {
    this.courseId = courseId;
  }
}

@Component({
  selector: 'app-cell-custom-pending',
  templateUrl: './cell-custom-pending.component.html',
  styleUrls: ['./cell-custom-pending.component.scss']
})
export class CellCustomPendingComponent implements ICellRendererAngularComp {

  modalRef: BsModalRef | undefined;

  constructor(
    private modalService: BsModalService,
    private http: HttpClient,
    private toast: ToastrService,
    private pending: PendingComponent,
    private fb: FormBuilder,
  ) { }

  closeResult: string = "";
  data: any;
  params: any;
  user: any;
  courses: any;
  classes: any;
  form!: FormGroup;

  agInit(params: any): void {
    this.data = params;
    this.params = params;
  }

  refresh(params: any): boolean {
    return false;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      classId: [null, []],
      studentId: [null, []],
    });
  }

  openModal(template: TemplateRef<any>) {
    // this.modalRef = this.modalService.show(
    //   template,
    //   Object.assign({}, { class: 'gray modal-lg' })
    // );
    this.modalRef = this.modalService.show(template);
  }

  classx: any;
  classOptions: Option[] = [];
  student_Id: any

  openModalChange(template: TemplateRef<any>, course_Id: any, student_Id: any) {
    this.student_Id = student_Id;
    this.classx = new Classes(course_Id);
    this.http.post<any>('http://localhost:8070/api/common/get_class_by_course_id', this.classx).subscribe(
      response => {
        this.classOptions = response.map((item: any) => ({ value: item.class_id, label: `Class: ${item.class_name}` }));
        console.log("xxxxxxxxxxxxxx" + JSON.stringify(response));
      }
    );
    this.modalRef = this.modalService.show(template);
  }

  openModalDelete(template: TemplateRef<any>, student_Id: any){
    this.modalRef = this.modalService.show(template);
    this.student_Id = student_Id;
  }

  updatePending() {
    console.log(JSON.stringify(this.params.data));
    this.http.put<any>('http://localhost:8070/api/admin/update_pending', this.params.data).subscribe(
      response => {
        if (response.state === true) {
          this.pending.onSearch(this.pending.indexPage);
          this.toast.success("Cập nhật thành công");
          this.modalRef?.hide();
        }
        else {
          this.toast.error("Cập nhật thất bại");
          this.modalRef?.hide();
        }
      }
    )
  }

  deletePending(){
    console.log(JSON.stringify(this.params.data));
    this.http.delete<any>('http://localhost:8070/api/admin/delete_pending_class/'+this.student_Id).subscribe(
      response => {
        if (response.state === true) {
          this.pending.onSearch(this.pending.indexPage);
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

  changePending() {
    const values = this.form.getRawValue();
    const payload = {
      ...values,
      classId: +values.classId,
      studentId: +this.student_Id,
    };

    if(payload.classId!=0){
      this.http.put<any>('http://localhost:8070/api/admin/change_pending_class', payload).subscribe(
        response => {
          if (response.state === true) {
            this.pending.onSearch(this.pending.indexPage);
            this.toast.success("Cập nhật thành công");
            this.modalRef?.hide();
          }
          else {
            this.toast.error("Cập nhật thất bại");
            this.modalRef?.hide();
          }
        }
      )
    }
  }
}
