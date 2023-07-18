import { Component, OnInit } from '@angular/core';
import { AuthService } from '@src/app/auth/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAuth$!: Observable<boolean>;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.isAuth$ = this.auth.getLogInStatus().pipe();
  }
}
