import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

/**
 * @title Configurable progress spinner
 */
@Component({
  selector: 'app-spinner',
  templateUrl: 'spinner.component.html',
  styleUrls: ['spinner.component.css']
})
export class SpinnerComponent {
  color: ThemePalette = 'primary';

  mode: ProgressSpinnerMode = 'determinate';
}
