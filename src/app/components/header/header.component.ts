import { Component, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  currentUser: any = false;

  constructor(
    private authService: AuthService,
  ) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (changes?.currentUser) {
      this.currentUser = changes.currentUser.currentValue;
    }
  }
}
