import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Observable, Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EventComponent } from '../event/event.component';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

export class EventX {
  private id: any;
  private name: any;
  private image: any;
  private from_date: any;
  private to_date: any;

  constructor(id: any, name: any, image: any, from_date: any, to_date: any) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.from_date = from_date;
    this.to_date = to_date;
  }
}

@Component({
  selector: 'app-cell-custom-event-component',
  templateUrl: './cell-custom-event-component.component.html',
  styleUrls: ['./cell-custom-event-component.component.scss']
})
export class CellCustomEventComponentComponent implements ICellRendererAngularComp {

  modalRef: BsModalRef | undefined;
  myImage!: Observable<any>;
  imageUrl: any;
  base64code!: any;
  event: any;
  data: any;
  params: any;
  from_date: any;
  to_date: any;

  constructor(
    private modalService: BsModalService,
    private http: HttpClient,
    private eventCom: EventComponent,
    private toast: ToastrService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
  }

  agInit(params: any): void {
    this.data = params;
    this.params = params;
  }

  refresh(params: any): boolean {
    return false;
  }


  openModal(template: TemplateRef<any>) {
    this.transformStartDate();
    this.transformEndDate();
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

  start_date: any;
  end_date: any;
  end_date_update: any;
  start_date_update: any;

  transformStartDate() {
    var newDate = this.params.data.from_date[3]+this.params.data.from_date[4]+this.params.data.from_date[2]+this.params.data.from_date[0]+this.params.data.from_date[1]
    +this.params.data.from_date[5]+this.params.data.from_date[6]+this.params.data.from_date[7]+this.params.data.from_date[8]+this.params.data.from_date[9];
    this.start_date = this.datePipe.transform(newDate, 'yyyy-MM-dd');
    return this.start_date;
  }

  transformEndDate() {
    var newDate = this.params.data.to_date[3]+this.params.data.to_date[4]+this.params.data.to_date[2]+this.params.data.to_date[0]+this.params.data.to_date[1]
    +this.params.data.to_date[5]+this.params.data.to_date[6]+this.params.data.to_date[7]+this.params.data.to_date[8]+this.params.data.to_date[9];
    this.end_date = this.datePipe.transform(newDate, 'yyyy-MM-dd');
    return this.end_date;
  }

  transformStartDateUpdate(date: any) {
    this.start_date_update = this.datePipe.transform(date, 'dd-MM-yyyy');
    return this.start_date_update;
  }

  transformEndDateUpdate(date: any) {
    this.end_date_update = this.datePipe.transform(date, 'dd-MM-yyyy');
    return this.end_date_update;
  }
  
  updateEvent() {
  this.transformStartDateUpdate(this.start_date);
  this.transformEndDateUpdate(this.end_date);

  console.log(this.start_date_update);

    if(this.imageUrl==null || this.imageUrl==undefined){
      this.event = new EventX(this.params.data.id, this.params.data.name, this.params.data.image, this.start_date_update, this.end_date_update);
    }else{
      this.event = new EventX(this.params.data.id, this.params.data.name, this.imageUrl, this.start_date_update, this.end_date_update);
    }
    
    this.http.put<any>('http://localhost:8070/api/admin/edit_event', this.event).subscribe(
      response => {
        if (response.state === true) {
          this.eventCom.onSearch();
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
