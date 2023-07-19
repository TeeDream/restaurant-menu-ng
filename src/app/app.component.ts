import { Component, OnInit } from '@angular/core';
import { AuthService } from '@src/app/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'restaurant-menu';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.checkIsLoggedIn();
  }
}
