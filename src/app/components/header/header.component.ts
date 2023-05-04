import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "@app/models/backend";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  @Input() isAuthorized: boolean | null;
  @Output() signOut = new EventEmitter<void>();

  @Input() user: User;
  constructor(private router: Router) {
    // this.isAuthorized = false;
  }
  ngOnInit(): void {
  }
  onSignOut() {
    this.signOut.emit();
  }
  onProfileNavigate(): void {
    const path = this.user ? this.user.uid : 'new';
    this.router.navigate(['/profile', path]);
  }
}
