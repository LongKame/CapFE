import { Component, OnInit, TemplateRef } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AcaComponent } from '../aca/aca.component';

export class AcademicAdmin {
  private id: any;
  private user_name: any;
  private full_name: any;
  private email: any;
  private phone: any;
  private address: any;
  private active: any;
  
  constructor(id: any, user_name: any, full_name: any,email: any, phone: any,address: any, active: any) {
    this.id = id;
    this.user_name = user_name;
    this.full_name = full_name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.active = active;
  }
}

@Component({
  selector: 'app-cell-custom-aca',
  templateUrl: './cell-custom-aca.component.html',
  styleUrls: ['./cell-custom-aca.component.scss']
})
export class CellCustomAcaComponent implements ICellRendererAngularComp {

  modalRef: BsModalRef | undefined;

  constructor(
    private modalService: BsModalService,
    private http: HttpClient,
    private aca: AcaComponent,
    private toast: ToastrService
  ) { }


  data: any;
  params: any;
  user: any;

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
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  openModalDelete(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  updateAca() {
    this.user = new AcademicAdmin(this.params.data.user_Id, "", this.params.data.full_name,"", this.params.data.phone, this.params.data.address, this.params.data.active);
    this.http.put<any>('http://localhost:8070/api/admin/edit_acad', this.user).subscribe(
      response => {
        if(response.state === true){
          this.aca.onSearch(this.aca.indexPage);
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

  deleteAca(){
    this.user = new AcademicAdmin(this.params.data.user_Id, null, null, null, null, null, null);
    this.http.put<any>('http://localhost:8070/api/admin/delete_acad', this.user).subscribe(
      response => {
        if(response.state === true){
          this.aca.onSearch(this.aca.indexPage);
          this.toast.success("Xóa thành công");
          this.modalRef?.hide();
        }
        else{
          this.toast.error("Xóa thất bại");
          this.modalRef?.hide();
        }
      }
    )
  }

  keyPressUserName(event: any) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
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

  keyPressPhone(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}
