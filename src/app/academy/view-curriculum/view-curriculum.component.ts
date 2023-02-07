import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-view-curriculum',
  templateUrl: './view-curriculum.component.html',
  styleUrls: ['./view-curriculum.component.scss']
})
export class ViewCurriculumComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.onSearch();
    }, 3000)
  }

  onSearchWarning(): Observable<any> {
    return this.http.get<any>('http://localhost:8070/api/common/view_curriculum');
  }

  rowData: any;

  onSearch() {
    this.onSearchWarning().subscribe(
      response => {
        this.rowData = response;
        console.log("jjjjjj"+JSON.stringify(response))
      }
    );
  }

}
