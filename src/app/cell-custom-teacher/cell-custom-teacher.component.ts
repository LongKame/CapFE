import { Component, OnInit, TemplateRef } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { ToastrService } from 'ngx-toastr';
import { HomeComponent } from '../pages/home/home.component';
import { TeacherComponent } from '../teacher/teacher.component';
import { Observable, Subscriber } from 'rxjs';

export class Teacher {
  private username: any;
  private fullname: any;
  private image: any;
  private password: any;
  private code: any;
  private email: any;
  private phone: any;
  private address: any;

  constructor(username: any, fullname: any, image: any, password: any, code: any,email: any, phone: any, address: any) {
    this.username = username;
    this.fullname = fullname;
    this.image = image;
    this.password = password;
    this.code = code;
    this.email = email;
    this.phone = phone;
    this.address = address;
  }
}

@Component({
  selector: 'app-cell-custom-teacher',
  templateUrl: './cell-custom-teacher.component.html',
  styleUrls: ['./cell-custom-teacher.component.scss']
})
export class CellCustomTeacherComponent implements ICellRendererAngularComp {

  modalRef: BsModalRef | undefined;
  myImage!: Observable<any>;
  base64code!: any;

  constructor(
    private modalService: BsModalService,
    private http: HttpClient,
    private teacher: TeacherComponent,
    private toast: ToastrService
  ) { }

  closeResult: string = "";
  data: any;
  params: any;
  user: any;
  imageUrl: any;

  agInit(params: any): void {
    this.data = params;
    this.params = params;
  }

  refresh(params: any): boolean {
    return false;
  }

  ngOnInit(): void {
    this.imageUrl = this.params.data.imageUrl;
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


  onChange($event: Event) {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    console.log(file);
    this.convertToBase64(file);
  }

  convertToBase64(file: File) {
    const observable = new Observable((subsciber: Subscriber<any>) => {
      this.readFile(file, subsciber)
    })
    observable.subscribe((d) => {
      console.log(d);
      this.imageUrl = d;
      this.base64code = d;
    })
  }

  readFile(file: File, subsciber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      subsciber.next(filereader.result);
      subsciber.complete();
    }
    filereader.onerror = () => {
      subsciber.error();
      subsciber.complete();
    }
  }


  updateTeacher() {

    if(this.imageUrl==null || this.imageUrl==undefined){
      this.user = new Teacher(this.params.data.user_Id, this.params.data.user_name, this.params.data.full_name,this.params.data.imageUrl
      , "", this.params.data.phone, this.params.data.address, this.params.data.active);
    }else{
      this.user = new Teacher(this.params.data.user_Id, this.params.data.user_name, this.params.data.full_name,this.imageUrl
      , "", this.params.data.phone, this.params.data.address, this.params.data.active);
    }
    
    this.http.put<any>('http://localhost:8070/api/admin/edit_teacher', this.user).subscribe(
      response => {
        if (response.state === true) {
          // this.teacher.onSearch(this.teacher.indexPage);
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

  deleteTeacher() {
    this.user = new Teacher(this.params.data.user_name, "", this.params.data.full_name,this.params.data.imageUrl
      , "", this.params.data.phone, this.params.data.address, this.params.data.active);
    this.http.put<any>('http://localhost:8070/api/admin/deactive_student', this.user).subscribe(
      response => {
        if(response.state === true){
        this.teacher.onSearch();
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

