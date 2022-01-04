import { Component, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from '../../core/interfaces';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
  ) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.currentUser) {
      this.currentUser = changes.currentUser.currentValue;
    }
  }
}
