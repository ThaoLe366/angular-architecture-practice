import {Component, Input, OnInit} from '@angular/core';
import {Employee, Recruiter} from "@app/models/backend";

@Component({
  selector: 'app-recruiter',
  templateUrl: './recruiter.component.html',
  styleUrls: ['./recruiter.component.scss']
})
export class RecruiterComponent implements OnInit{
  @Input() role:  Recruiter;

  constructor() {
  }
  ngOnInit() {
  }
}
