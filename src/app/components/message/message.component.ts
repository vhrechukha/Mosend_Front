import {
  Component, Input, SimpleChanges, OnChanges
} from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnChanges {
  @Input() message = '';

  @Input() loading = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.loading) {
      this.loading = changes.loading.currentValue;
    }
  }
}
