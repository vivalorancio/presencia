import { Component, Input, OnInit } from '@angular/core';
import { getContrastingColor } from 'ngx-color';
import {
  colorCollection,
  ColorCollectionItem,
  getFromColor,
  getTextColor,
} from '../colors';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css'],
})
export class ColorPickerComponent implements OnInit {
  @Input() colorItem: ColorCollectionItem = {
    name: 'bg-white',
    color: '#FFFFFF',
  };

  colors = colorCollection.map((group: ColorCollectionItem[]) =>
    group.map((coloritem: ColorCollectionItem) => coloritem.color)
  );

  hidden = true;

  @Input() position = 'right';

  constructor() {}

  ngOnInit(): void {}

  toggleColors() {
    this.hidden = !this.hidden;
  }

  isActive(color: string) {
    return color === this.colorItem.color;
  }

  setColorItem($event: any) {
    this.colorItem.color = $event.hex;
    this.colorItem.name = getFromColor(this.colorItem.color).name;
    this.colorItem.text = getTextColor(this.colorItem.color);
  }
}
