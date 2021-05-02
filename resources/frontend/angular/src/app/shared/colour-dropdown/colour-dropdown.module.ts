import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColourDropdownComponent } from './colour-dropdown/colour-dropdown.component';

@NgModule({
  declarations: [ColourDropdownComponent],
  imports: [CommonModule],
  exports: [ColourDropdownComponent],
})
export class ColourDropdownModule {}
