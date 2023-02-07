import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

export enum Menu {
  Teacher = 'Giảng viên',
  Curriculum = 'Tài liệu',
  Room = 'Phòng học',
  Quiz = 'Câu hỏi',
  Student = 'Sinh viên',
  Violate = 'Vi phạm',
  Event = 'Sự kiện',
  Account = 'Tài khoản',
  EventDetail = 'Thông tin sự kiện',
  Statistic = 'Báo cáo thống kê',
  TimeTable = 'Thời khóa biểu',
  ChangeClass = 'Thay đổi lớp',
  ViewStudentsInAllClasses = 'Học viên một lớp',
  ViewStudentsInOwnClasses = 'Học viên một lớp',
  CheckAttendance = 'Điểm danh',
  UpdateSchedule = 'Thay đổi lịch học',
  AcademicAdmin = 'Admin tài vụ',
  Class = 'Lớp học',
  Course = 'Khóa học',
  Pending = 'Hàng chờ',
  Logout = 'Đăng xuất',
}

export type MenuItem = {
  menu: Menu;
  icon: IconDefinition;
  link?: string;
  onClick?: () => void;
};

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() menus: MenuItem[] = [];
  showingTooltip: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe(['(max-width: 1023px)'])
      .subscribe((result: BreakpointState) => {
        if (result.matches) {
          this.showingTooltip = true
          return;
        }
        this.showingTooltip = false;
      });
  }
}
