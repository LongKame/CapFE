import { Component, OnInit, TemplateRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService, UserRole } from '../../_services/auth.service';
import { TokenService } from '../../_services/token.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';


export class User {
  private user_name: any;

  constructor(user_name: any) {
    this.user_name = user_name;
  }
}

export class UserX {
  private username: any;

  constructor(username: any) {
    this.username = username;
  }
}

export class Reset {
  private email: any;

  constructor(email: any) {
    this.email = email;
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

export class Student {
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

export class Violate {
  private post_user_name: any;
  private violated_code: any;
  private name: any;
  private image: any;

  constructor(post_user_name: any, violated_code: any, name: any, image: any) {
    this.post_user_name = post_user_name;
    this.violated_code = violated_code;
    this.name = name;
    this.image = image;
  }
}


@Component({
  selector: 'header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  modalRef?: BsModalRef;
  formLogin!: FormGroup;
  formRegis!: FormGroup;
  formForgot!: FormGroup;
  formChangePassword!: FormGroup;
  userProfile?: any;
  emailReset: any;
  reset: any;
  old_password: any;
  new_password: any;
  re_new_password: any;
  change_password: any;

  constructor(
    private http: HttpClient,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private toastService: ToastrService,
    private router: Router,
    private ngZone: NgZone,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: [null, []],
      password: [null, []],
    });
    this.formRegis = this.fb.group({
      username: [null, []],
      password: [null, []],
      fullname: [null, []],
      email: [null, []],
      phone: [null, []],
      address: [null, []],
    });
    this.userProfile = this.tokenService.getUserProfile();
    setTimeout(() => {
      this.onLoad();
      this.onLoadViolate();
    }, 3000)
  }

  readonly phoneFormControl = new FormControl('', [
    Validators.required, Validators.pattern(("[6-9]\\d{9}"))
  ]);

  state: boolean = true;

  openLoginForm(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openRegisForm(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openForgotForm(template: TemplateRef<any>) {
    this.modalRef?.hide();
    this.modalRef = this.modalService.show(template);
  }

  onLogin() {
    const values = this.formLogin.getRawValue();
    this.authService.login(values).subscribe(
      (res) => {
        const accessToken = res.access_token;
        const decodeToken = this.tokenService.decodeToken(res.access_token);

        this.tokenService.saveAccessToken(accessToken);
        this.tokenService.saveRole(res.role);
        this.userProfile = JSON.parse(decodeToken.sub);
        this.tokenService.saveUserProfile(this.userProfile);

        this.formLogin.reset();
        this.modalRef?.hide();
        this.toastService.success('Đăng nhập thành công');
        this.ngZone.run(() => {
          this.router.navigateByUrl(this.getRedirectURLbyRole(res.role as UserRole));
        });
      },
      (err) => {
        this.toastService.error('Đăng nhập thất bại');
      }
    );
  }

  keyPressPhone(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onChange() {
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

  onRegister() {
    const values = this.formRegis.getRawValue();
    console.log(JSON.stringify(values));
    this.http.post<any>('http://localhost:8070/api/v1/registration', values).subscribe(
      (res) => {
        this.toastService.success('Đã gửi xác nhận đến email của bạn');
      },
      (err) => {
        // this.toastService.error('Register failed');
        this.toastService.success('Đã gửi xác nhận đến email của bạn');
      }
    );
  }

  onForgot() {
    this.reset = new Reset(this.emailReset);
    this.http.post<any>('http://localhost:8070/api/common/reset_password', this.reset).subscribe(
      (res) => {
        this.toastService.success('Đã gửi xác nhận đến email của bạn');
      },
      (err) => {
        // this.toastService.error('Register failed');
        this.toastService.success('Đã gửi xác nhận đến email của bạn');
      }
    );
  }

  getRedirectURLbyRole(role: UserRole) {
    switch (role) {
      case UserRole.ROLE_ADMIN:
        return '/home/teacher';
      case UserRole.ROLE_ACADEMIC_ADMIN:
        return '/aca-admin/course';
      case UserRole.ROLE_TEACHER:
        return '/teacher-page/viewteacher';
      case UserRole.ROLE_STUDENT:
        return '/student-page/student';
      default:
        return '/';
    }
  }

  onLogout() {
    this.tokenService.doLogout();
    this.userProfile = undefined;
    this.toastService.success('Logout successfully');
    this.router.navigateByUrl('/');
  }

  onUpdateProfile(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  openFoul(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
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

  openChange(template: TemplateRef<any>) {
    this.modalRef?.hide();
    this.modalRef = this.modalService.show(template);
  }

  student: any;
  violate: any;
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
  violated_code: any;
  name: any;
  image: any;
  violateX: any;
  

  onLoad() {
    if (this.tokenService.getUserProfile()?.username != null) {
      this.user = new User(this.tokenService.getUserProfile()?.username);
      this.http.post<any>('http://localhost:8070/api/common/get_profile_student', this.user).subscribe(
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

  onLoadViolate() {
    if (this.tokenService.getUserProfile()?.username != null) {
      this.user = new UserX(this.tokenService.getUserProfile()?.username);
      this.http.post<any>('http://localhost:8070/api/common/get_self_violate', this.user).subscribe(
        response => {
          this.violateX = response;
        }
      )
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
  imageUrl: any;
  base64code!: any;

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

  onChange1($event: Event) {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    console.log(file);
    this.convertToBase64(file);
  }

  updateProfile() {
    this.student = new Student(this.user_id_param, this.user_name_param, this.full_name_param, this.email_param, this.phone_param, this.address_param);
    this.http.put<any>('http://localhost:8070/api/common/edit_profile_student', this.student).subscribe(
      response => {
        if (response.state === true) {
          this.toast.success("Thay đổi thành công");
          this.modalRef?.hide();
        }
        else {
          this.toast.error("Thay đổi thất bại");
          this.modalRef?.hide();
        }
      }
    )
  }

  addViolate() {
    this.violate = new Violate(this.tokenService.getUserProfile()?.username, this.violated_code, this.name, this.imageUrl);
    this.http.post<any>('http://localhost:8070/api/common/add_violate', this.violate).subscribe(
      response => {
        if (response.state === true) {
          this.toast.success("Thêm thành công");
          this.modalRef?.hide();
        }
        else {
          this.toast.error("Thay đổi thất bại");
          this.modalRef?.hide();
        }
      }
    )
  }
}
