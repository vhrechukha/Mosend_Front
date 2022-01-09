import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html'
})
export class Dialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      link: string
    }
  ) {}

  shareLink = this.data.link;
}
