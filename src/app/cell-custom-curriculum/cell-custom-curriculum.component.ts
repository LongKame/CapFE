import { Component, OnInit, TemplateRef } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CurriculumComponent } from '../curriculum/curriculum.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

export class Curriculum {
  private id: any;
  private courseId: any;
  private name: any;
  private linkURL: any;
  private description: any;

  constructor(id: any, courseId: any, name: any, linkURL: any, description: any) {
    this.id = id;
    this.courseId = courseId;
    this.name = name;
    this.linkURL = linkURL;
    this.description = description;
  }
}

export type Option = {
  value: number | string;
  label: string;
};


@Component({
  selector: 'app-cell-custom-curriculum',
  templateUrl: './cell-custom-curriculum.component.html',
  styleUrls: ['./cell-custom-curriculum.component.scss']
})
export class CellCustomCurriculumComponent implements ICellRendererAngularComp {

  modalRef: BsModalRef | undefined;
  courses = new FormControl(1);
  courseId: any;
  
  constructor(
    private modalService: BsModalService,
    private http: HttpClient,
    private curri: CurriculumComponent,
    private toast: ToastrService
  ) { }


  data: any;
  params: any;
  curriculum: any;
  courseOptions: Option[] = [];

  agInit(params: any): void {
    this.data = params;
    this.params = params;
  }

  refresh(params: any): boolean {
    return false;
  }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:8070/api/aca/get_course').subscribe(res => {
      this.courseOptions = res.map((item: any) => ({ value: item.id, label: item.name }));
    });
  }

  openModal(template: TemplateRef<any>) {
    this.courseId = this.courseOptions.find(i=>i.value===this.params.data.course_id);
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  openModalDelete(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  updateCurriculum() {
    
    this.curriculum = new Curriculum(this.params.data.id, this.courseId.value, this.params.data.curriculum_name, this.params.data.link_url, this.params.data.description);
    this.http.put<any>('http://localhost:8070/api/aca/edit_curriculum', this.curriculum).subscribe(
      response => {
        if (response.state === true) {
          this.curri.onSearch(this.curri.indexPage);
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

  deleteCurriculum() {
    this.http.delete<any>('http://localhost:8070/api/aca/delete_curriculum/' + this.params.data.id).subscribe(
      response => {
        if (response.state === true) {
          this.curri.onSearch(this.curri.indexPage);
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


