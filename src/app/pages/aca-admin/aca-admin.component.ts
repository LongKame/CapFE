import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../../_services/token.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import * as fa from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuItem } from '../../sidebar/sidebar.component';

export class User {
  private user_name: any;

  constructor(user_name: any) {
    this.user_name = user_name;
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

export class Teacher {
  private user_Id: any;
  private user_name: any;
  private full_name: any;
  private email: any;
  private phone: any;
  private address: any;

  constructor(user_Id: any, user_name: any, full_name: any, email: any, phone: any, address: any) {
    this.user_Id = user_Id;
    this.user_name = user_name;
    this.full_name = full_name;
    this.email = email;
    this.phone = phone;
    this.address = address;
  }
}

@Component({
  selector: 'app-aca-admin',
  templateUrl: './aca-admin.component.html',
  styleUrls: ['./aca-admin.component.scss']
})
export class AcaAdminComponent implements OnInit {
  menus: MenuItem[] = [
    {
      icon: fa.faBook,
      menu: Menu.Course,
      link: '/aca-admin/course'
    },
    {
      icon: fa.faFile,
      menu: Menu.Curriculum,
      link: '/aca-admin/curriculum'
    },
    {
      icon: fa.faQuestion,
      menu: Menu.Quiz,
      link: '/aca-admin/quiz'
    },
    {
      icon: fa.faHouseUser,
      menu: Menu.Room,
      link: '/aca-admin/room'
    },
    {
      icon: fa.faSignOutAlt,
      menu: Menu.Logout,
      onClick: () => this.onLogout(),
    },
  ];

  userProfile?: any;
  modalRef: BsModalRef | undefined;

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

  user: any;
  user_Id: any;
  user_name: any;
  full_name: any;
  email: any;
  phone: any;
  address: any;
  profile: any;
  user_id_param: any;
  user_name_param: any;
  full_name_param: any;
  email_param: any;
  phone_param: any;
  address_param: any;
  acad: any;

  onLoad() {
    if (this.tokenService.getUserProfile()?.username != null) {
      this.user = new User(this.tokenService.getUserProfile()?.username);
      this.http.post<any>('http://localhost:8070/api/aca/get_profile_aca', this.user).subscribe(
        response => {
          this.profile = response;
          this.user_id_param = response.user_Id;
          this.user_name_param = response.user_name;
          this.full_name_param = response.full_name;
          this.email_param = response.email;
          this.phone_param = response.phone;
          this.address_param = response.address;
        }
      )
    }
  }

  openChange(template: TemplateRef<any>) {
    this.modalRef?.hide();
    this.modalRef = this.modalService.show(template);
  }

  change_password: any;
  old_password: any;
  new_password: any;
  re_new_password: any;

  onChangePassword() {
    this.change_password = new ChangePassword(this.tokenService.getUserProfile()?.username, this.old_password, this.new_password);
    this.http.post<any>('http://localhost:8070/api/common/change_password', this.change_password).subscribe(
      response => {
        if (response.state === true) {
          this.toast.success("Thay đổi mật khẩu thành công");
          this.modalRef?.hide();
        }
        else {
          this.toast.error("Thay đổi thất bại");
          this.modalRef?.hide();
        }
      }
    );
  }

  updateProfile() {
    this.acad = new Teacher(this.user_id_param, this.user_name_param, this.full_name_param, this.email_param, this.phone_param, this.address_param);
    this.http.put<any>('http://localhost:8070/api/aca/edit_profile_aca', this.acad).subscribe(
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
