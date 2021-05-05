import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerOverlayComponent } from './spinner-overlay.component';

@NgModule({
  declarations: [SpinnerOverlayComponent],
  imports: [CommonModule],
  exports: [SpinnerOverlayComponent],
})
export class SpinnerOverlayModule {}
