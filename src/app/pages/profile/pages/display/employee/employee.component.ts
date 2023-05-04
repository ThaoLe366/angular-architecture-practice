import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Employee, Recruiter} from "../../../store/user";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeComponent implements OnInit {
  @Input() role: Employee;
  ngOnInit() {
  }
  constructor() {
  }
}
