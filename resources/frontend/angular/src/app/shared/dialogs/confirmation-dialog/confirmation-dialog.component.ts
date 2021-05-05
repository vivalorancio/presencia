import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css'],
})
export class ConfirmationDialogComponent implements OnInit {
  @Input() show: boolean = false;
  @Input() title!: string;
  @Input() message!: string;
  @Input() actionName!: string;

  @Output() action = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  confirm() {
    this.action.emit(true);
  }
  discard() {
    this.action.emit(false);
  }
}
