import { Component, OnInit, TemplateRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TokenService } from 'src/app/_services/token.service';

export class StudentInEvent {
  private eventId: any;
  private username: any;
  private caption: any;
  private image: any;

  constructor(eventId: any, username: any, caption: any, image: any) {
    this.eventId = eventId;
    this.username = username;
    this.caption = caption;
    this.image = image;
  }
}

export class Course {
  private id: any;
  private levelId: any;
  private name: any;
  private fee: any;
  private createdAt: any;
  private updatedAt: any;
  private numberSlot: any;
  private image: any;
  private description: any;

  constructor(id: any, levelId: any, name: any, fee: any, createdAt: any, updatedAt: any, numberSlot: any, image: any, description: any) {
    this.id = id;
    this.levelId = levelId;
    this.name = name;
    this.fee = fee;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.numberSlot = numberSlot;
    this.image = image;
    this.description = description;
  }
}

export class Course1 {
  private id: any;

  constructor(id: any) {
    this.id = id;
  }
}

export class Classes {
  private courseId: any;

  constructor(courseId: any) {
    this.courseId = courseId;
  }
}

export class Classes1 {
  private classId: any;
  private username: any;

  constructor(classId: any, username: any) {
    this.classId = classId;
    this.username = username;
  }
}

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  modalRef?: BsModalRef;
  form!: FormGroup;
  userProfile?: any;

  constructor(
    private modalService: BsModalService,
    private http: HttpClient,
    private tokenService: TokenService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.onLoad();
  }

  course: any;
  classes: any;
  classes1: any;
  id: any;
  rowView: any;
  rowClass: any;
  courseId: any;
  class_id: any;
  user_name: any;
  detail: any;
  course_name: any = "Ok";

  onSearchWarning(course: any): Observable<any> {
    return this.http.post<any>('http://localhost:8070/api/common/get_course_by_id', course);
  }

  openViewDetail(template: TemplateRef<any>, id: any) {
    this.id = id;
    this.course = new Course1(this.id);
    console.log(this.course);
    this.onSearchWarning(this.course).subscribe(
      response => {
        this.detail = response;
        console.log(this.course_name);
      }
    );
    this.modalRef = this.modalService.show(template);
  }

  eventId: any;
  caption: any;
  imageUrl: any;
  base64code!: any;

  openFormRegis(template: TemplateRef<any>, id: any) {
    this.eventId = id;
    this.modalRef = this.modalService.show(template);
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

  onChange($event: Event) {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    console.log(file);
    this.convertToBase64(file);
  }

  register() {
    this.classes1 = new StudentInEvent(this.eventId, this.tokenService.getUserProfile()?.username, this.caption, this.imageUrl);
    this.http.post<any>('http://localhost:8070/api/common/register_event', this.classes1).subscribe(
      response => {
        if (response.state === true) {
          this.toast.success("Đăng ký thành công");
          this.modalRef?.hide();
        }
        else {
          this.toast.error("Đăng ký thất bại");
          this.modalRef?.hide();
        }
      }
    );
  }

  onLoad() {
    this.http.get<any>('http://localhost:8070/api/common/get_event').subscribe(
      response => {
        this.course = response;
      }
    );
  }

}
