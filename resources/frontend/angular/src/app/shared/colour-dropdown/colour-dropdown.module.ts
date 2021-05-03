import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColourDropdownComponent } from './colour-dropdown/colour-dropdown.component';
import { ClickOutsideModule } from 'ng-click-outside';

@NgModule({
  declarations: [ColourDropdownComponent],
  imports: [CommonModule, ClickOutsideModule],
  exports: [ColourDropdownComponent],
})
export class ColourDropdownModule {}
