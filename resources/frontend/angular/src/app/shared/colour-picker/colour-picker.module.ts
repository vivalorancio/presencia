import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColourPickerComponent } from './colour-picker/colour-picker.component';
import { SwatchModule } from 'ngx-color';

@NgModule({
  declarations: [ColourPickerComponent],
  imports: [CommonModule, SwatchModule],
  exports: [ColourPickerComponent],
})
export class ColourPickerModule {}
