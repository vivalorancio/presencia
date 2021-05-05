import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Input() meta: any;
  @Input() active: any;
  @Output() page = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  firstpage() {
    this.page.emit('1');
  }
  previouspage() {
    this.page.emit(`${this.meta.current_page - 1}`);
  }
  nextpage() {
    this.page.emit(`${this.meta.current_page + 1}`);
  }
  lastpage() {
    this.page.emit(`${this.meta.last_page}`);
  }
}
