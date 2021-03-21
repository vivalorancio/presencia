import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  message = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get('/api/user', { withCredentials: true }).subscribe(
      (res: any) =>
        (this.message = `Hola ${res.employee.first_name} ${res.employee.last_name}  (${res.user.username})`),
      () => this.router.navigate(['/login'])
    );
  }
}
