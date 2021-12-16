import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  currentUser: any = false;

  /*constructor(
    private authService: AuthService,
  ) {
    this.authService.currentUser.subscribe((user)=>{
      this.currentUser = user
    })
  }*/

}
