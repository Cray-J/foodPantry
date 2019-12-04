import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LoggingService, LoggingService2 } from "./logging.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService,
              private loggingService: LoggingService2) {
  }

  ngOnInit(): void {
    this.authService.autoLogin();
    this.loggingService.printLog('Hello from app component ngOnInit');
  }
}
