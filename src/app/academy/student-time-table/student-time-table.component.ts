import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/_services/token.service';


export class TimeTable {
  private user_name: any;
  private date_study: any;

  constructor(user_name: any, date_study: any) {
    this.user_name = user_name;
    this.date_study = date_study;
  }
}

@Component({
  selector: 'app-student-time-table',
  templateUrl: './student-time-table.component.html',
  styleUrls: ['./student-time-table.component.scss']
})
export class StudentTimeTableComponent implements OnInit {

  constructor(private http: HttpClient,
    private modalService: BsModalService,
    private tokenService: TokenService,
    private toast: ToastrService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.onSearch();
      this.getCurrentWeek();
    }, 3000)
  }


  onSearchWarning(): Observable<any> {
    return this.http.get<any>('http://localhost:8070/api/common/get_every_week');
  }

  weekData: any;
  timeTable: any;

  onSearch() {
    this.onSearchWarning().subscribe(
      response => {
        this.weekData = response;
      }
    )
  }

  firstDayOfWeek: any;
  lastDayOfWeek: any;

  getCurrentWeek() {
    const today = new Date();
    const dateNow = new Date(today);
    const day = dateNow.getDay();
    const diff = dateNow.getDate() - day + (day === 0 ? -6 : 1);
    const firstDay = new Date(dateNow.setDate(diff));
    const lastDay = new Date(firstDay);
    lastDay.setDate(lastDay.getDate() + 6);
    this.firstDayOfWeek = this.formatDate(firstDay);
    this.lastDayOfWeek = this.formatDate(lastDay);
    console.log(this.firstDayOfWeek + "  " + this.lastDayOfWeek);

    if (this.mon === null || this.mon === undefined) {
      const x = this.firstDayOfWeek[3] + this.firstDayOfWeek[4] + "/" + this.firstDayOfWeek[0] + this.firstDayOfWeek[1] + "/2023";
      var date = new Date(x.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
      const dateOfWeek = [];
      for (let i = 0; i < 7; i++) {
        if (i == 0) {
          date.setDate(date.getDate());
          var newdate = "";
          if ((date.getDate()).toString().length == 1) {
            newdate += '0' + (date.getDate()).toString() + '-';
          } else if ((date.getDate()).toString().length == 2) {
            newdate += (date.getDate()).toString() + '-';
          }
          if ((date.getMonth() + 1).toString().length == 1) {
            newdate += '0' + (date.getMonth() + 1).toString() + '-';
          } else if ((date.getMonth() + 1).toString().length == 2) {
            newdate += (date.getMonth() + 1).toString() + '-';
          }
          newdate += date.getFullYear();
          dateOfWeek[i] = newdate.toString();
        } else {
          date.setDate(date.getDate() + 1);
          var newdate = "";
          if ((date.getDate()).toString().length == 1) {
            newdate += '0' + (date.getDate()).toString() + '-';
          } else if ((date.getDate()).toString().length == 2) {
            newdate += (date.getDate()).toString() + '-';
          }
          if ((date.getMonth() + 1).toString().length == 1) {
            newdate += '0' + (date.getMonth() + 1).toString() + '-';
          } else if ((date.getMonth() + 1).toString().length == 2) {
            newdate += (date.getMonth() + 1).toString() + '-';
          }
          newdate += date.getFullYear();
          dateOfWeek[i] = newdate.toString()
        }
      }
      this.mon = dateOfWeek[0];
      this.tue = dateOfWeek[1];
      this.wed = dateOfWeek[2];
      this.thu = dateOfWeek[3];
      this.fri = dateOfWeek[4];
      this.sat = dateOfWeek[5];
      this.sun = dateOfWeek[6];

      this.mon1 = dateOfWeek[0][6] + dateOfWeek[0][7] + dateOfWeek[0][8] + dateOfWeek[0][9] + dateOfWeek[0][5] + dateOfWeek[0][3] + dateOfWeek[0][4] + dateOfWeek[0][2] + dateOfWeek[0][0] + dateOfWeek[0][1];
      this.tue1 = dateOfWeek[1][6] + dateOfWeek[1][7] + dateOfWeek[1][8] + dateOfWeek[1][9] + dateOfWeek[1][5] + dateOfWeek[1][3] + dateOfWeek[1][4] + dateOfWeek[1][2] + dateOfWeek[1][0] + dateOfWeek[1][1];;
      this.wed1 = dateOfWeek[2][6] + dateOfWeek[2][7] + dateOfWeek[2][8] + dateOfWeek[2][9] + dateOfWeek[2][5] + dateOfWeek[2][3] + dateOfWeek[2][4] + dateOfWeek[2][2] + dateOfWeek[2][0] + dateOfWeek[2][1];
      this.thu1 = dateOfWeek[3][6] + dateOfWeek[3][7] + dateOfWeek[3][8] + dateOfWeek[3][9] + dateOfWeek[3][5] + dateOfWeek[3][3] + dateOfWeek[3][4] + dateOfWeek[3][2] + dateOfWeek[3][0] + dateOfWeek[3][1];
      this.fri1 = dateOfWeek[4][6] + dateOfWeek[4][7] + dateOfWeek[4][8] + dateOfWeek[4][9] + dateOfWeek[4][5] + dateOfWeek[4][3] + dateOfWeek[4][4] + dateOfWeek[4][2] + dateOfWeek[4][0] + dateOfWeek[4][1];
      this.sat1 = dateOfWeek[5][6] + dateOfWeek[5][7] + dateOfWeek[5][8] + dateOfWeek[5][9] + dateOfWeek[5][5] + dateOfWeek[5][3] + dateOfWeek[5][4] + dateOfWeek[5][2] + dateOfWeek[5][0] + dateOfWeek[5][1];
      this.sun1 = dateOfWeek[6][6] + dateOfWeek[6][7] + dateOfWeek[6][8] + dateOfWeek[6][9] + dateOfWeek[6][5] + dateOfWeek[6][3] + dateOfWeek[6][4] + dateOfWeek[6][2] + dateOfWeek[6][0] + dateOfWeek[6][1];

      this.mon = '02-01-2023';
      this.tue = '03-01-2023';
      this.wed = '04-01-2023';
      this.thu = '05-01-2023';
      this.fri = '06-01-2023';
      this.sat = '07-01-2023';
      this.sun = '08-01-2023';

      this.getDataForDay1('2023-01-02');
      this.getDataForDay2('2023-01-03');
      this.getDataForDay3('2023-01-04');
      this.getDataForDay4('2023-01-05');
      this.getDataForDay5('2023-01-06');
      this.getDataForDay6('2023-01-07');
      this.getDataForDay7('2023-01-08');


      // this.getDataForDay1(this.mon1);
      // this.getDataForDay2(this.tue1);
      // this.getDataForDay3(this.wed1);
      // this.getDataForDay4(this.thu1);
      // this.getDataForDay5(this.fri1);
      // this.getDataForDay6(this.sat1);
      // this.getDataForDay7(this.sun1);
    }
  }

  formatFullDate(date: Date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    return [day, month, year].join('-');
  }

  formatDate(date: any) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    return [day, month].join('-');
  }

  getDataForDay1(date: any) {
    this.timeTable = new TimeTable(this.tokenService.getUserProfile()?.username, date);
    this.http.post<any>('http://localhost:8070/api/common/get_time_table_for_student', this.timeTable).subscribe(
      response => {
        this.mon2 = response;
        console.log("wtf" + response);
      }
    )
  }

  getDataForDay2(date: any) {
    this.timeTable = new TimeTable(this.tokenService.getUserProfile()?.username, date);
    this.http.post<any>('http://localhost:8070/api/common/get_time_table_for_student', this.timeTable).subscribe(
      response => {
        this.tue2 = response;
      }
    )
  }

  getDataForDay3(date: any) {
    this.timeTable = new TimeTable(this.tokenService.getUserProfile()?.username, date);
    this.http.post<any>('http://localhost:8070/api/common/get_time_table_for_student', this.timeTable).subscribe(
      response => {
        this.wed2 = response;
      }
    )
  }

  getDataForDay4(date: any) {
    this.timeTable = new TimeTable(this.tokenService.getUserProfile()?.username, date);
    this.http.post<any>('http://localhost:8070/api/common/get_time_table_for_student', this.timeTable).subscribe(
      response => {
        this.thu2 = response;
      }
    )
  }

  getDataForDay5(date: any) {
    this.timeTable = new TimeTable(this.tokenService.getUserProfile()?.username, date);
    this.http.post<any>('http://localhost:8070/api/common/get_time_table_for_student', this.timeTable).subscribe(
      response => {
        this.fri2 = response;
      }
    )
  }

  getDataForDay6(date: any) {
    this.timeTable = new TimeTable(this.tokenService.getUserProfile()?.username, date);
    this.http.post<any>('http://localhost:8070/api/common/get_time_table_for_student', this.timeTable).subscribe(
      response => {
        this.sat2 = response;
      }
    )
  }

  getDataForDay7(date: any) {
    this.timeTable = new TimeTable(this.tokenService.getUserProfile()?.username, date);
    this.http.post<any>('http://localhost:8070/api/common/get_time_table_for_student', this.timeTable).subscribe(
      response => {
        this.sun2 = response;
      }
    )
  }

  mon: any;
  tue: any;
  wed: any;
  thu: any;
  fri: any;
  sat: any;
  sun: any;

  mon1: any;
  tue1: any;
  wed1: any;
  thu1: any;
  fri1: any;
  sat1: any;
  sun1: any;

  mon2: any;
  tue2: any;
  wed2: any;
  thu2: any;
  fri2: any;
  sat2: any;
  sun2: any;

  selectedValue(data: any) {
    const x = data[3] + data[4] + "/" + data[0] + data[1] + "/2023";
    var date = new Date(x.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
    const dateOfWeek = [];
    for (let i = 0; i < 7; i++) {
      if (i == 0) {
        date.setDate(date.getDate());
        var newdate = "";
        if ((date.getDate()).toString().length == 1) {
          newdate += '0' + (date.getDate()).toString() + '-';
        } else if ((date.getDate()).toString().length == 2) {
          newdate += (date.getDate()).toString() + '-';
        }
        if ((date.getMonth() + 1).toString().length == 1) {
          newdate += '0' + (date.getMonth() + 1).toString() + '-';
        } else if ((date.getMonth() + 1).toString().length == 2) {
          newdate += (date.getMonth() + 1).toString() + '-';
        }
        newdate += date.getFullYear();
        dateOfWeek[i] = newdate.toString();
      } else {
        date.setDate(date.getDate() + 1);
        var newdate = "";
        if ((date.getDate()).toString().length == 1) {
          newdate += '0' + (date.getDate()).toString() + '-';
        } else if ((date.getDate()).toString().length == 2) {
          newdate += (date.getDate()).toString() + '-';
        }
        if ((date.getMonth() + 1).toString().length == 1) {
          newdate += '0' + (date.getMonth() + 1).toString() + '-';
        } else if ((date.getMonth() + 1).toString().length == 2) {
          newdate += (date.getMonth() + 1).toString() + '-';
        }
        newdate += date.getFullYear();
        dateOfWeek[i] = newdate.toString()
      }
    }

    this.mon = dateOfWeek[0];
    this.tue = dateOfWeek[1];
    this.wed = dateOfWeek[2];
    this.thu = dateOfWeek[3];
    this.fri = dateOfWeek[4];
    this.sat = dateOfWeek[5];
    this.sun = dateOfWeek[6];

    this.mon1 = dateOfWeek[0][6] + dateOfWeek[0][7] + dateOfWeek[0][8] + dateOfWeek[0][9] + dateOfWeek[0][5] + dateOfWeek[0][3] + dateOfWeek[0][4] + dateOfWeek[0][2] + dateOfWeek[0][0] + dateOfWeek[0][1];
    this.tue1 = dateOfWeek[1][6] + dateOfWeek[1][7] + dateOfWeek[1][8] + dateOfWeek[1][9] + dateOfWeek[1][5] + dateOfWeek[1][3] + dateOfWeek[1][4] + dateOfWeek[1][2] + dateOfWeek[1][0] + dateOfWeek[1][1];;
    this.wed1 = dateOfWeek[2][6] + dateOfWeek[2][7] + dateOfWeek[2][8] + dateOfWeek[2][9] + dateOfWeek[2][5] + dateOfWeek[2][3] + dateOfWeek[2][4] + dateOfWeek[2][2] + dateOfWeek[2][0] + dateOfWeek[2][1];
    this.thu1 = dateOfWeek[3][6] + dateOfWeek[3][7] + dateOfWeek[3][8] + dateOfWeek[3][9] + dateOfWeek[3][5] + dateOfWeek[3][3] + dateOfWeek[3][4] + dateOfWeek[3][2] + dateOfWeek[3][0] + dateOfWeek[3][1];
    this.fri1 = dateOfWeek[4][6] + dateOfWeek[4][7] + dateOfWeek[4][8] + dateOfWeek[4][9] + dateOfWeek[4][5] + dateOfWeek[4][3] + dateOfWeek[4][4] + dateOfWeek[4][2] + dateOfWeek[4][0] + dateOfWeek[4][1];
    this.sat1 = dateOfWeek[5][6] + dateOfWeek[5][7] + dateOfWeek[5][8] + dateOfWeek[5][9] + dateOfWeek[5][5] + dateOfWeek[5][3] + dateOfWeek[5][4] + dateOfWeek[5][2] + dateOfWeek[5][0] + dateOfWeek[5][1];
    this.sun1 = dateOfWeek[6][6] + dateOfWeek[6][7] + dateOfWeek[6][8] + dateOfWeek[6][9] + dateOfWeek[6][5] + dateOfWeek[6][3] + dateOfWeek[6][4] + dateOfWeek[6][2] + dateOfWeek[6][0] + dateOfWeek[6][1];

    this.getDataForDay1(this.mon1);
    this.getDataForDay2(this.tue1);
    this.getDataForDay3(this.wed1);
    this.getDataForDay4(this.thu1);
    this.getDataForDay5(this.fri1);
    this.getDataForDay6(this.sat1);
    this.getDataForDay7(this.sun1);
  }


}
