import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColourPickerComponent } from './colour-picker/colour-picker.component';
import { SwatchModule } from 'ngx-color';
import { ClickOutsideModule } from 'ng-click-outside';

@NgModule({
  declarations: [ColourPickerComponent],
  imports: [CommonModule, SwatchModule, ClickOutsideModule],
  exports: [ColourPickerComponent],
})
export class ColourPickerModule {}
