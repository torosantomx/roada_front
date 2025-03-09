import { inject, Injectable } from '@angular/core';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { SessionService } from './session.service';
import { ModalsService } from './modals.service';
import { Router } from '@angular/router';
import { AppRoutes } from '@routes/app.routes';

@Injectable({
  providedIn: 'root'
})
export class AutoLogOutService {

  private modalShowed = false;

  constructor() {
    this.idle.onTimeoutWarning.subscribe((countdown) => {
      if (countdown === this.wartingAfter && this.sessionService.isLoggedIn && !this.modalShowed) {
        this.modalShowed = true;
        this.modalService.openSessionInfoModal();
      }
    });

    this.idle.onTimeout.subscribe(() => {
      if (!this.sessionService.isLoggedIn) return;      
      this.idle.stop();
      this.sessionService.logOut();
      this.modalService.closeAllModals();
      this.router.navigateByUrl(AppRoutes.login.path);

    });
  }

  private idle = inject(Idle);
  private sessionService = inject(SessionService);
  private modalService = inject(ModalsService);
  private secondsPerMinute = 60;
  private defaultTime = 30 * this.secondsPerMinute;
  private wartingAfter = 5 * this.secondsPerMinute;
  private router = inject(Router);

  public start() {
    this.idle.setIdle(this.defaultTime);
    this.idle.setTimeout(this.wartingAfter);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    this.idle.watch();
  }
}
