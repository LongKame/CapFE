import { Component, OnInit, TemplateRef } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { QuizComponent } from '../quiz/quiz.component';

export class Quiz {
  private id: any;
  private question: any;
  private answerA: any;
  private answerB: any;
  private answerC: any;
  private answerD: any;
  private correct: any;

  constructor(id: any, question: any, answerA: any, answerB: any, answerC: any, answerD: any, correct: any) {
    this.id = id;
    this.question = question;
    this.answerA = answerA;
    this.answerB = answerB;
    this.answerC = answerC;
    this.answerD = answerD;
    this.correct = correct;
  }
}

@Component({
  selector: 'app-cell-custom-quiz',
  templateUrl: './cell-custom-quiz.component.html',
  styleUrls: ['./cell-custom-quiz.component.scss']
})
export class CellCustomQuizComponent implements ICellRendererAngularComp {

  modalRef: BsModalRef | undefined;

  constructor(
    private modalService: BsModalService,
    private http: HttpClient,
    private quiz: QuizComponent,
    private toast: ToastrService
  ) { }

  public courses: any;

  data: any;
  params: any;
  user: any;
  quizz: any;

  agInit(params: any): void {
    this.data = params;
    this.params = params;
  }

  refresh(params: any): boolean {
    return false;
  }

  ngOnInit(): void {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  openModalDelete(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  updateQuiz() {
    this.quizz = new Quiz(this.params.data.id,this.params.data.question, this.params.data.answerA,this.params.data.answerB
      ,this.params.data.answerC, this.params.data.answerD, this.params.data.correct);
    this.http.put<any>('http://localhost:8070/api/aca/edit_quiz', this.quizz).subscribe(
      response => {
        if(response.state === true){
          this.quiz.onSearch(this.quiz.indexPage);
          this.toast.success("Cập nhật thành công");
          this.modalRef?.hide();
        }
        else{
          this.toast.error("Cập nhật thất bại");
          this.modalRef?.hide();
        }
      }
    )
  }

  deleteQuiz(){
    this.http.delete<any>('http://localhost:8070/api/aca/delete_quiz/'+this.params.data.id).subscribe(
      response => {
        if(response.state === true){
          this.quiz.onSearch(this.quiz.indexPage);
          this.toast.success("Xóa thành công");
          this.modalRef?.hide();
        }
        else{
          this.toast.error("Xóa thất bại");
          this.modalRef?.hide();
        }
      }
    )
  }

}
