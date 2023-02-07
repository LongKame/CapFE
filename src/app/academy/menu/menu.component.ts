import { Component } from '@angular/core';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  menus = [
    { text: '', link: '/'}
    // { text: 'Trang chủ', link: '/'},
    // { text: 'Đội ngũ giảng viên', link: '/academy/teache-team'},
    // { text: 'Học viên', link: '/academy/student-feedback'},
    // { text: 'Thời khóa biểu một lớp', link: '/academy/class-schedule'},
    // { text: 'Thời khóa biểu', link: '/academy/student-time-table'},
    // { text: 'Học liệu', link: '/academy/view-curriculum'},
    // { text: 'Bài quiz', link: '/academy/quiz'},
  ];
}