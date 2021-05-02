import { Component, Input, OnInit } from '@angular/core';
import { getContrastingColor } from 'ngx-color';
import {
  colourCollection,
  ColourCollectionItem,
  getFromColour,
  getTextColour,
} from '../colours';

@Component({
  selector: 'app-colour-picker',
  templateUrl: './colour-picker.component.html',
  styleUrls: ['./colour-picker.component.css'],
})
export class ColourPickerComponent implements OnInit {
  @Input() colourItem: ColourCollectionItem = {
    name: 'bg-white',
    colour: '#FFFFFF',
  };

  colours = colourCollection.map((group: ColourCollectionItem[]) =>
    group.map((colouritem: ColourCollectionItem) => colouritem.colour)
  );

  hidden = true;

  @Input() position = 'right';

  constructor() {}

  ngOnInit(): void {}

  toggleColours() {
    this.hidden = !this.hidden;
  }

  isActive(colour: string) {
    return colour === this.colourItem.colour;
  }

  setColourItem($event: any) {
    this.colourItem.colour = $event.hex;
    this.colourItem.name = getFromColour(this.colourItem.colour).name;
    this.colourItem.text = getTextColour(this.colourItem.colour);
  }
}
