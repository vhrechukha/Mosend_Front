import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../core/interfaces';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    if (!this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  async ngOnInit() {
    this.user = await this.authService.currentUserValue;
    console.log(this.user);
  }

  logout() {
    this.authService.logout();
    console.log('logout');
    this.router.navigate(['/']);
  }
}
