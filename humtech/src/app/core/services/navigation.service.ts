import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NavItem } from '../../shared/components/navbar.component';
import { FooterColumn } from '../../shared/components/footer.component';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private readonly navItems = signal<NavItem[]>([
    { label: 'Home', path: '/' },
    {
      label: 'Services',
      path: '/services',
      children: [
        { label: 'ERP Software Solutions', path: '/services/erp-software-solutions' },
        { label: 'Android App Development', path: '/services/android-app-development' },
        { label: 'Artificial Intelligence Projects', path: '/services/artificial-intelligence-projects' },
      ],
    },
    { label: 'About', path: '/about' },
    { label: 'Harm Academy', path: '/harm-academy' },
    { label: 'Careers', path: '/careers' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ]);

  private readonly footerColumns = signal<FooterColumn[]>([
    {
      title: 'Company',
      links: [
        { label: 'About', path: '/about' },
        { label: 'Careers', path: '/careers' },
        { label: 'Partners', path: '/about#partners' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'ERP Platforms', path: '/services/erp-software-solutions' },
        { label: 'Android Apps', path: '/services/android-app-development' },
        { label: 'AI Initiatives', path: '/services/artificial-intelligence-projects' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Blog', path: '/blog' },
        { label: 'Case Studies', path: '/services#case-studies' },
        { label: 'Academy', path: '/harm-academy' },
      ],
    },
  ]);

  private readonly socialLinks = signal<Array<{ label: string; url: string }>>([
    { label: 'LinkedIn', url: 'https://linkedin.com/company/humtech' },
    { label: 'Twitter', url: 'https://twitter.com/humtech' },
    { label: 'YouTube', url: 'https://youtube.com/@humtech' },
  ]);

  getNavigation(): Observable<NavItem[]> {
    return of(this.navItems());
  }

  getFooterColumns(): Observable<FooterColumn[]> {
    return of(this.footerColumns());
  }

  getSocialLinks(): Observable<Array<{ label: string; url: string }>> {
    return of(this.socialLinks());
  }
}
