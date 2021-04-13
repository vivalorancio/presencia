import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { SwatchModule } from 'ngx-color';

@NgModule({
  declarations: [ColorPickerComponent],
  imports: [CommonModule, SwatchModule],
  exports: [ColorPickerComponent],
})
export class ColorPickerModule {}
