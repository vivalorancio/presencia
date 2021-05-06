import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { getTextColourFromName } from 'src/app/shared/colour-picker/colours';
import { ColourDropdownItem } from '../colour-dropdown';

@Component({
  selector: 'app-colour-dropdown',
  templateUrl: './colour-dropdown.component.html',
  styleUrls: ['./colour-dropdown.component.css'],
})
export class ColourDropdownComponent implements OnInit {
  is_hidden: boolean = true;

  none: ColourDropdownItem = {
    id: -1,
    colour: 'bg-white',
    code: '',
    description: 'None',
  };

  @Input() items: ColourDropdownItem[] = [];
  @Input() direction = 'down';

  @Input() selectedId: number = -1;
  @Output() selectedIdChange = new EventEmitter<number>();

  //
  //
  //
  //    FALTA LA DIRECTIVA PER A HIGHLIGHT!!!!
  //
  //
  //
  //
  //

  constructor() {}

  ngOnInit(): void {}

  getTextColourFromName = getTextColourFromName;

  togglelist() {
    this.is_hidden = !this.is_hidden;
  }

  closelist() {
    this.is_hidden = true;
  }

  isSelected(item: ColourDropdownItem): boolean {
    return this.selectedId === item.id;
  }

  selectItem(item: ColourDropdownItem) {
    this.selectedId = item.id;
    this.selectedIdChange.emit(this.selectedId);
    this.togglelist();
  }

  selected(): ColourDropdownItem {
    return this.items.find((item) => item.id === this.selectedId) || this.none;
  }
}
