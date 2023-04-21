import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  @Input() isAuthorized: boolean | null;
  @Output() signOut = new EventEmitter<void>();
  constructor() {
    // this.isAuthorized = false;
  }
  ngOnInit(): void {
  }
  onSignOut() {
    this.signOut.emit();
  }
}
