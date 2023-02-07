import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CellCustomClassComponent } from '../cell-custom-class/cell-custom-class.component';
import { CourseService } from '../course/course.service';
import { RoomService } from '../room/room.service';
import { SlotService } from '../slot/slot.service';
import { TeacherService } from '../teacher/teacher.service';
import { Option } from '../_common/types/option';
import { ClassService } from './class.service';
import { WeekSlot, WeekSlotType } from './class.type';
import { BASE_URL } from '../_common/constants/api';

export class Class {
  private class_id: any;
  private class_name: any;
  private room_id: any;
  private room_name: any;
  private user_id: any;
  private teacher_id: any;
  private full_name: any;
  private email: any;
  private number_of_student: any;
  private capacity: any;
  private start_date: any;
  private active_room: any;
  
  constructor(class_id: any, class_name: any, room_id: any, room_name: any, user_id: any,teacher_id: any, full_name: any, email: any, number_of_student: any, capacity: any, start_date: any, active_room: any) {
    this.class_id = class_id;
    this.class_name = class_name;
    this.room_id = room_id;
    this.room_name = room_name;
    this.user_id = user_id;
    this.teacher_id = teacher_id;
    this.full_name = full_name;
    this.email = email;
    this.number_of_student = number_of_student;
    this.capacity = capacity;
    this.start_date = start_date;
    this.active_room = active_room;
  }
}

export class View {
  private page: any;
  private pageSize: any;
  private key_search: any;

  constructor(page: any, pageSize: any, key_search: any) {
    this.page = page;
    this.pageSize = pageSize;
    this.key_search = key_search;
  }
}

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {


  ngOnInit(): void {
    this.createTable();
    setTimeout(() => {
      this.page(this.indexPage);
    }, 3000)

    this.searchInforForm = this.formBuilder.group({
      key_search: '',
      page: this.indexPage,
      pageSize: this.PAGE_SIZE,
    });

    this.roomService.getRooms().subscribe(res => {
      this.roomOptions = res.map(item => ({ value: item.id, label: item.roomname }));
    });
    this.courseService.getCourses().subscribe(res => {
      this.courseOptions = res.map(item => ({ value: item.id, label: item.name }));
    });
    this.teacherService.getTeachers().subscribe(res => {
      this.teacherOptions = res.map(item => ({ value: item.teacher_Id, label: `Teacher: ${item.full_name}` }));
    });
    this.slotService.getSlots().subscribe(res => {
      this.slotOptions = res.map(item => ({ value: item.id, label: `${item.fromTime} - ${item.toTime}` }));
    });
  
    this.form = this.fb.group({
      class_name: [null, []],
      room_id: [null, []],
      teacher_id: [null, []],
      slot_id: [null, []],
      start_date: [null, []],
      firstOnWeek: [null, []],
      secondOnWeek: [null, []],
      course_id: [null, []],
    });
  }

  roomOptions: Option[] = [];
  courseOptions: Option[] = [];
  teacherOptions: Option[] = [];
  slotOptions: Option[] = [];
  weekSlotOptions: Option[] = Object.keys(WeekSlot).map((key) => ({ value: WeekSlot[key as WeekSlotType], label: key }));
  slotOneOptions: Option[] = this.weekSlotOptions;
  slotTwoOptions: Option[] = this.weekSlotOptions;
  form!: FormGroup;

  public classes: any;
  public view: any;

  class_id: any;
  class_name: any;
  room_id: any;
  room_name: any;
  user_id: any;
  teacher_id: any;
  full_name: any;
  email: any;
  number_of_student: any;
  capacity: any;
  start_date: any;
  active_room: any;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private toastService: ToastrService,
    private roomService: RoomService,
    private courseService: CourseService,
    private teacherService: TeacherService,
    private slotService: SlotService,
    private classService: ClassService,
    private changeDetectorRef: ChangeDetectorRef,
    private fb: FormBuilder,
  ) { 
      this.view = new View(1,this.PAGE_SIZE,"");
    }

    columnDefs: any;
    rowData: any
    modalRef: BsModalRef | undefined;
    searchInforForm: any;
    totalResultSearch: any;
    currentTotalDisplay: any;
    totalPage: any;
    PAGE_SIZE: any = 1;
    defaultColDef: any;
    key: any;
    indexPage: any;
    check: boolean = false;

    onStartDateChange(e: Event) {
      const values = this.form.getRawValue();
      const slotOneFrom = new Date(values['start_date']).getDay();
      this.check = true;

      this.slotOneOptions = this.weekSlotOptions.filter(item => item.value === slotOneFrom - 1);
      this.form.get('firstOnWeek')?.setValue(slotOneFrom - 1);

      this.slotTwoOptions = this.weekSlotOptions.filter(item => item.value >= slotOneFrom);
      this.form.get('secondOnWeek')?.setValue(null);
    }

    onFirstOnWeekChange(e: any) {
      const firstOnWeek = e.target.value as number;
      this.slotTwoOptions = this.weekSlotOptions.filter(item => item.value > firstOnWeek || item.value === 6);
      this.form.get('secondOnWeek')?.setValue(null);
    }


    rangeWithDots: any;
  first: number = 1;
  last: number = 10;

  pagination(current: any, last: any) {
    var delta = 2,
      left = current - delta,
      right = current + delta + 1,
      range = [],
      rangeWithDots = [],
      l;

    for (let i = 1; i <= last; i++) {
      if (i == 1 || i == last || (i >= left && i < right)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  }

    page(page: number, btn?: any): void {
      this.indexPage = page;
  
      let listBtn = document.getElementsByClassName('btn-pag')
      for (let i = 0; i < listBtn.length; i++) {
        const element = listBtn[i];
        element.setAttribute('style', 'color:black');
      }
  
      if (!btn) {
        console.log("KM")
        const eleSelect = document.getElementById('btn' + (this.indexPage - 1).toString())
          if (eleSelect) {
            eleSelect!.style.color = "white"
          }
      } 
  
      if (btn) {
        btn.target.style.color = "white"
      } 
  
      this.searchInforForm.controls.page.setValue(this.indexPage);
      this.onSearch();
    }

    onAddClass() {
      const values = this.form.getRawValue();
      const payload = {
        ...values,
        room_id: +values.room_id,
        teacher_id: +values.teacher_id,
        slot_id: +values.slot_id,
        firstOnWeek: +values.firstOnWeek,
        secondOnWeek: +values.secondOnWeek,
        course_id: +values.course_id
      };

      this.classService.addClass(payload).subscribe((res: any) => {
        if (!res.state) {
          this.toastService.error(res.message);
          return;
        }

        this.toastService.success("Success");
        this.onCloseForm();
        // this.onSearch(this.indexPage);
      }, (err) => {
        this.toastService.error('Something went wrong.');
      })
    }

    onCloseForm() {
      this.form.reset();
      this.modalRef?.hide();
      this.slotOneOptions = [...this.slotOptions];
      this.slotTwoOptions = [...this.slotOptions];
    }

    onSearchWarning(bodySearch: any): Observable<any>  {
      return this.http.post<any>('http://localhost:8070/api/admin/get_all_class',bodySearch);
    }

    onSearch() {
      console.log(this.searchInforForm.value);
    this.onSearchWarning(this.searchInforForm.value).subscribe(
      response => {
        console.log(response);
        this.rowData = response.resultData;
        this.totalResultSearch = response.totalRecordNoLimit;
        this.currentTotalDisplay = Object.keys(this.rowData).length;
        this.totalPage = Math.ceil(this.totalResultSearch / this.PAGE_SIZE);
        this.rangeWithDots = this.pagination(this.indexPage, this.totalPage);

        if (Object.keys(this.rowData).length === 0) {
          this.first = 0;
        } else {
          this.first = (this.PAGE_SIZE * (this.indexPage - 1)) + 1
        }
        this.last = Object.keys(this.rowData).length + (this.PAGE_SIZE * (this.indexPage - 1))
        this.changeDetectorRef.detectChanges()
      }
    );
    }
  
    prev(): void {
      if (this.indexPage > 1) {
        this.indexPage--;
      }
      if (this.indexPage < 1) {
        this.indexPage = 1
      }
      // this.onSearch(this.indexPage);
    }
    
    next(): void {
      this.indexPage++;
      if (this.indexPage > this.totalPage) {
        this.indexPage = this.totalPage
      }
      // this.onSearch(this.indexPage);
    }
  
    openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(
        template,
        Object.assign({}, { class: 'gray modal-lg' })
      );
    }
  
    STYLE_TABLE = {
      'font-size': '15px',
      'align-items': 'center',
      'top': '30px',
      'overflow': 'hidden',
      'text-align': 'center',
      'font-weight':'bold'
    }
  
    createTable() {
  
      this.defaultColDef = {
        sortable: true,
        filter: true
      };
  
      this.columnDefs = [
        {
          headerName: 'Số thứ tự',
          valueGetter: (params: any) => {
            if (params.node.rowIndex == 0) {
              return params.node.rowIndex = 1;
            } else {
              params.node.rowIndex++;
              return params.node.rowIndex++;
            }
          }
          , cellStyle: this.STYLE_TABLE
        },
        { headerName: 'Lớp học', field: 'class_name', cellStyle: this.STYLE_TABLE },
        { headerName: 'Phòng học', field: 'room_name', cellStyle: this.STYLE_TABLE},
        { headerName: 'Giảng viên', field: 'full_name', cellStyle: this.STYLE_TABLE },
        { headerName: 'Mức độ', field: 'level', cellStyle: this.STYLE_TABLE },
        { headerName: 'Sức chứa', field: 'capacity', cellStyle: this.STYLE_TABLE },
        { headerName: 'Ngày bắt đầu', field: 'start_date', cellStyle: this.STYLE_TABLE },
        { headerName: 'Ngày kết thúc', field: 'end_date', cellStyle: this.STYLE_TABLE },
        {
          headerName: "Hành động",
          cellRendererFramework: CellCustomClassComponent,
        },
      ];
    }
    index: any;
}
