import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CountdownModule } from 'ngx-countdown';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AcademyComponent } from './academy.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { TeacheTeamComponent } from './teache-team/teache-team.component';
import { StudentFeebackComponent } from './student-feeback/student-feeback.component';
import { ClassScheduleComponent } from './class-schedule/class-schedule.component';
import { StudentTimeTableComponent } from './student-time-table/student-time-table.component';
import { ViewCurriculumComponent } from './view-curriculum/view-curriculum.component';

const routes: Routes = [
  {
    path: '',
    component: AcademyComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'quiz', component: QuizListComponent },
      { path: 'quiz/:level', component: QuizComponent },
      { path: 'teache-team', component: TeacheTeamComponent },
      { path: 'student-feedback', component: StudentFeebackComponent },
      { path: 'class-schedule', component: ClassScheduleComponent },
      { path: 'view-curriculum', component: ViewCurriculumComponent },
      { path: 'student-time-table', component: StudentTimeTableComponent },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CountdownModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      easeTime: 50,
      positionClass: 'toast-bottom-left',
    }),
  ],
  declarations: [
    AcademyComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    QuizComponent,
    QuizListComponent,
    TeacheTeamComponent,
    StudentFeebackComponent,
    ClassScheduleComponent,
    StudentTimeTableComponent,
    ViewCurriculumComponent
  ],
})
export class AcademyModule {}
