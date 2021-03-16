import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  message = '';
  constructor(private htttp: HttpClient) {}

  ngOnInit(): void {
    this.htttp.get('/api/user', { withCredentials: true }).subscribe(
      (res: any) => (this.message = `Hola ${res.username}`),
      (err) => (this.message = 'Not logged in')
    );
  }
}
