import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavbarComponent } from '../../shared/components/navbar.component';
import { FooterComponent } from '../../shared/components/footer.component';
import { NotificationCenterComponent } from '../../shared/components/notification-center.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner.component';
import { NavigationService } from '../../core/services/navigation.service';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent, NotificationCenterComponent, LoadingSpinnerComponent],
  template: `
    <app-notification-center></app-notification-center>
    <app-navbar [items]="navigation()"></app-navbar>
    <main>
      <app-loading-spinner class="fixed inset-x-0 top-20 z-50" [visible]="loading() > 0"></app-loading-spinner>
      <router-outlet></router-outlet>
    </main>
    <app-footer [columns]="footerColumns()" [social]="socialLinks()"></app-footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent implements OnInit {
  private readonly navigationService = inject(NavigationService);
  private readonly loadingService = inject(LoadingService);

  readonly navigation = toSignal(this.navigationService.getNavigation(), { initialValue: [] });
  readonly footerColumns = toSignal(this.navigationService.getFooterColumns(), { initialValue: [] });
  readonly socialLinks = toSignal(this.navigationService.getSocialLinks(), { initialValue: [] });
  readonly loading = this.loadingService.isLoading;

  ngOnInit(): void {
    document.body.classList.add('bg-accent-50');
  }
}
