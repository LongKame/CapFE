import { Component, OnInit, TemplateRef } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ClassComponent } from '../class/class.component';

export class Classes {
  private id: any;
  private roomId: any;
  private teacherId: any;
  private name: any;
  
  constructor(id: any, roomId: any, teacherId: any,name: any) {
    this.id = id;
    this.roomId = roomId;
    this.teacherId = teacherId;
    this.name = name;
  }
}


@Component({
  selector: 'app-cell-custom-class',
  templateUrl: './cell-custom-class.component.html',
  styleUrls: ['./cell-custom-class.component.scss']
})
export class CellCustomClassComponent implements ICellRendererAngularComp {

  modalRef: BsModalRef | undefined;

  constructor(
    private modalService: BsModalService,
    private classComponent: ClassComponent,
    private http: HttpClient,
    private toast: ToastrService
  ) { }


  data: any;
  params: any;
  classes: any;

  agInit(params: any): void {
    this.data = params;
    this.params = params;
  }

  refresh(params: any): boolean {
    return false;
  }

  ngOnInit(): void {
  }

  openModal(template: TemplateRef<any>) {
    // this.modalRef = this.modalService.show(
    //   template,
    //   Object.assign({}, { class: 'gray modal-lg' })
    // );
    this.modalRef = this.modalService.show(template);
  }


  updateClass() {
    this.classes = new Classes(this.params.data.class_id, this.params.data.room_id, this.params.data.user_Id, this.params.data.full_name,);
    this.http.put<any>('http://localhost:8070/api/admin/disable_class', this.classes).subscribe(
      response => {
        if(response.state === true){
          // this.classComponent.onSearch(this.classComponent.indexPage);
          this.toast.success("Cập nhật thành công");
          this.modalRef?.hide();
        }
        else{
          this.toast.error("Cập nhật thất bại");
          this.modalRef?.hide();
        }
      }
    )
  }
}

