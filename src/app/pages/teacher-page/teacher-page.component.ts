import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../../_services/token.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';
import * as fa from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuItem } from '../../sidebar/sidebar.component';

export class Teacher {
  private user_Id: any;
  private user_name: any;
  private full_name: any;
  private imageUrl: any;
  private email: any;
  private phone: any;
  private address: any;

  constructor(user_Id: any, user_name: any, full_name: any, imageUrl: any, email: any, phone: any, address: any) {
    this.user_Id = user_Id;
    this.user_name = user_name;
    this.full_name = full_name;
    this.imageUrl = imageUrl;
    this.email = email;
    this.phone = phone;
    this.address = address;
  }
}


export class ChangePassword {
  private user_name: any;
  private old_password: any;
  private new_password: any;

  constructor(user_name: any, old_password: any, new_password: any) {
    this.user_name = user_name;
    this.old_password = old_password;
    this.new_password = new_password;
  }
}


export class User {
  private user_name: any;

  constructor(user_name: any) {
    this.user_name = user_name;
  }
}

@Component({
  selector: 'app-teacher-page',
  templateUrl: './teacher-page.component.html',
  styleUrls: ['./teacher-page.component.scss']
})
export class TeacherPageComponent implements OnInit {
  menus: MenuItem[] = [
    {
      icon: fa.faChalkboardTeacher,
      menu: Menu.Teacher,
      link: '/teacher-page/viewteacher'
    },
    // {
    //   icon: fa.faGraduationCap,
    //   menu: Menu.Student,
    //   link: '/teacher-page/viewstudent'
    // },
    {
      icon: fa.faLandmark,
      menu: Menu.Class,
      link: '/teacher-page/viewclass'
    },
    {
      icon: fa.faUserFriends,
      menu: Menu.AcademicAdmin,
      link: '/teacher-page/viewaca'
    },
    {
      icon: fa.faTable,
      menu: Menu.TimeTable,
      link: '/teacher-page/time_table'
    },
    {
      icon: fa.faSearchPlus,
      menu: Menu.ViewStudentsInOwnClasses,
      link: '/teacher-page/view-students-in-classes'
    },
    // {
    //   icon: fa.faCalendarCheck,
    //   menu: Menu.CheckAttendance,
    //   link: '/teacher-page/check-attendance'
    // },
    {
      icon: fa.faSignOutAlt,
      menu: Menu.Logout,
      onClick: () => this.onLogout(),
    },
  ];

  userProfile?: any;
  checkData: string = ''
  constructor(
    private tokenService: TokenService,
    private toast: ToastrService,
    private modalService: BsModalService,
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.userProfile = this.tokenService.getUserProfile();
    setTimeout(() => {
      this.onLoad();
    }, 3000)
  }

  modalRef: BsModalRef | undefined;

  onLogout() {
    this.tokenService.doLogout();
    this.userProfile = undefined;
    this.toast.success('Đăng xuất thành công');
    this.router.navigateByUrl('/');
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  
  myImage!: Observable<any>;
  teacher: any;
  user: any;
  user_Id: any;
  user_name: any;
  full_name: any;
  imageUrl: any;
  email: any;
  phone: any;
  address: any;
  profile: any;
  user_id_param: any;
  user_name_param: any;
  full_name_param: any;
  imageUrl_param: any;
  email_param: any;
  phone_param: any;
  address_param: any;
  base64code!: any;
  currentImage: any;

  onLoad() {
    if (this.tokenService.getUserProfile()?.username != null) {
      this.user = new User(this.tokenService.getUserProfile()?.username);
      this.http.post<any>('http://localhost:8070/api/teacher/get_profile_teacher', this.user).subscribe(
        response => {
          this.profile = response;
          this.user_id_param = response.user_Id;
          this.user_name_param = response.user_name;
          this.full_name_param = response.full_name;
          this.imageUrl_param = response.imageUrl;
          this.email_param = response.email;
          this.phone_param = response.phone;
          this.address_param = response.address;
        }
      )
    }
  }

  phone_param1: any;

  check(value:any){
    console.log(this.checkData);
  }
  updateProfile() {
    if (this.myImage == null || this.myImage == undefined) {
      this.teacher = new Teacher(this.user_id_param, this.user_name_param, this.full_name_param, this.imageUrl_param, this.email_param, this.phone_param, this.address_param);
    } else {
      this.teacher = new Teacher(this.user_id_param, this.user_name_param, this.full_name_param, this.myImage, this.email_param, this.phone_param, this.address_param);
    }

    this.http.put<any>('http://localhost:8070/api/teacher/edit_profile_teacher',this.teacher).subscribe(
      response => {
        if (response.state === true) {
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

  openChange(template: TemplateRef<any>) {
    this.modalRef?.hide();
    this.modalRef = this.modalService.show(template);
  }

  change_password: any;
  old_password: any;
  new_password: any;
  re_new_password: any;

  onChangePassword(){
    this.change_password = new ChangePassword(this.tokenService.getUserProfile()?.username, this.old_password, this.new_password);
    this.http.post<any>('http://localhost:8070/api/common/change_password', this.change_password).subscribe(
      response => {
        if (response.state === true) {
          this.toast.success("Thay đổi mật khẩu thành công");
          this.modalRef?.hide();
        }
        else {
          this.toast.error("Thay đổi mật khẩu thất bại");
          this.modalRef?.hide();
        }
      }
    );
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
      this.myImage = d;
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

}
