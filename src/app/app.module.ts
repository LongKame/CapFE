import { NgModule, TemplateRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { TeacherComponent } from './teacher/teacher.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { AcaComponent } from './aca/aca.component';
import { CellCustomAcaComponent } from './cell-custom-aca/cell-custom-aca.component';
import { ClassComponent } from './class/class.component';
import { CellCustomTeacherComponent } from './cell-custom-teacher/cell-custom-teacher.component';
import { CellCustomStudentComponent } from './cell-custom-student/cell-custom-student.component';
import { AcaAdminComponent } from './pages/aca-admin/aca-admin.component';
import { StdComponent } from './pages/std/std.component';
import { StudentComponent } from './student/student.component';
import { CourseComponent } from './course/course.component';
import { CellCustomCourseComponent } from './cell-custom-course/cell-custom-course.component';
import { RoomComponent } from './room/room.component';
import { CellCustomRoomComponent } from './cell-custom-room/cell-custom-room.component';
import { QuizComponent } from './quiz/quiz.component';
import { CellCustomQuizComponent } from './cell-custom-quiz/cell-custom-quiz.component';
import { PendingComponent } from './pending/pending.component';
import { CellCustomPendingComponent } from './cell-custom-pending/cell-custom-pending.component';
import { CurriculumComponent } from './curriculum/curriculum.component';
import { TeacherPageComponent } from './pages/teacher-page/teacher-page.component';
import { TestComponent } from './test/test.component';
import { ViewStudentComponent } from './view-student/view-student.component';
import { ViewTeacherComponent } from './view-teacher/view-teacher.component';
import { ViewAcaComponent } from './view-aca/view-aca.component';
import { ViewClassComponent } from './view-class/view-class.component';
import { ViewTimetableComponent } from './view-timetable/view-timetable.component';
import { CellCustomClassComponent } from './cell-custom-class/cell-custom-class.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { TimeTableComponent } from './time-table/time-table.component';
import { MatSelectModule} from '@angular/material/select';
import { DatePipe } from '@angular/common';
import { CellCustomCurriculumComponent } from './cell-custom-curriculum/cell-custom-curriculum.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ChangeClassComponent } from './change-class/change-class.component';
import { UpdateScheduleComponent } from './update-schedule/update-schedule.component';
import { CellCustomUpdateScheduleComponent } from './cell-custom-update-schedule/cell-custom-update-schedule.component';
import { ViewStudentsInAllClassesComponent } from './view-students-in-all-classes/view-students-in-all-classes.component';
import { ViewStudentInOwnClassComponent } from './view-student-in-own-class/view-student-in-own-class.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CheckAttendanceComponent } from './check-attendance/check-attendance.component';
import { CellCustomCheckAttendanceComponent } from './cell-custom-check-attendance/cell-custom-check-attendance.component';
import { EventComponent } from './event/event.component';
import { CellCustomEventComponentComponent } from './cell-custom-event-component/cell-custom-event-component.component';
import { ViolateComponent } from './violate/violate.component';
import { AccComponent } from './acc/acc.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    HomeComponent,
    TeacherComponent,
    AcaComponent,
    CellCustomAcaComponent,
    ClassComponent,
    CellCustomTeacherComponent,
    CellCustomStudentComponent,
    AcaAdminComponent,
    StdComponent,
    StudentComponent,
    CourseComponent,
    CellCustomCourseComponent,
    RoomComponent,
    CellCustomRoomComponent,
    QuizComponent,
    CellCustomQuizComponent,
    PendingComponent,
    CellCustomPendingComponent,
    CurriculumComponent,
    TeacherPageComponent,
    TestComponent,
    ViewStudentComponent,
    ViewTeacherComponent,
    ViewAcaComponent,
    ViewClassComponent,
    ViewTimetableComponent,
    CellCustomClassComponent,
    TimeTableComponent,
    CellCustomCurriculumComponent,
    ChangeClassComponent,
    UpdateScheduleComponent,
    CellCustomUpdateScheduleComponent,
    ViewStudentsInAllClassesComponent,
    ViewStudentInOwnClassComponent,
    CheckAttendanceComponent,
    CellCustomCheckAttendanceComponent,
    EventComponent,
    CellCustomEventComponentComponent,
    ViolateComponent,
    AccComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    MatFormFieldModule ,
    MatSelectModule,
    MatInputModule,
    AgGridModule.withComponents([]),
    ModalModule.forRoot(),
    CommonModule,
    NgxSkeletonLoaderModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-left',
      preventDuplicates: false,
    }),
    FontAwesomeModule,
    MatTooltipModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
    RoleGuard,
    DatePipe
  ],
  entryComponents:[CellCustomTeacherComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
