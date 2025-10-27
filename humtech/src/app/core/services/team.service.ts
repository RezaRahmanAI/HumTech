import { Injectable, signal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { SocialLink, TeamMember } from '../models/content.models';

@Injectable({ providedIn: 'root' })
export class TeamService {
  private readonly members = signal<TeamMember[]>([
    this.createMember(
      'amina-rahman',
      'Amina Rahman',
      'Chief Executive Officer',
      'Enterprise transformation leader with 15+ years architecting resilient digital ecosystems for Fortune 500 companies.',
      'assets/images/team/amina-rahman.webp',
      [
        { id: 'linkedin', platform: 'linkedin', url: 'https://linkedin.com/in/amina-rahman' },
        { id: 'twitter', platform: 'twitter', url: 'https://twitter.com/amina' },
      ]
    ),
    this.createMember(
      'marco-fernandez',
      'Marco Fernandez',
      'Chief Technology Officer',
      'Cloud-native engineer specializing in distributed systems, event-driven architecture, and AI-assisted automation.',
      'assets/images/team/marco-fernandez.webp',
      [
        { id: 'linkedin', platform: 'linkedin', url: 'https://linkedin.com/in/marco-fernandez' },
        { id: 'github', platform: 'github', url: 'https://github.com/marco' },
      ]
    ),
    this.createMember(
      'sylvia-mensah',
      'Sylvia Mensah',
      'Director of Product Strategy',
      'Product leader driving customer-centric innovation with measurable business outcomes across fintech and healthtech.',
      'assets/images/team/sylvia-mensah.webp',
      [
        { id: 'linkedin', platform: 'linkedin', url: 'https://linkedin.com/in/sylvia-mensah' },
      ]
    ),
    this.createMember(
      'li-wei',
      'Li Wei',
      'Head of Data Science',
      'Responsible AI advocate delivering predictive analytics and ML solutions with strong governance and ethics.',
      'assets/images/team/li-wei.webp',
      [
        { id: 'linkedin', platform: 'linkedin', url: 'https://linkedin.com/in/li-wei' },
        { id: 'twitter', platform: 'twitter', url: 'https://twitter.com/liwei_ai' },
      ]
    ),
  ]);

  getAll(): Observable<TeamMember[]> {
    return of(this.members());
  }

  getById(id: string): Observable<TeamMember | undefined> {
    return of(this.members().find((member) => member.id === id));
  }

  create(member: TeamMember): Observable<TeamMember> {
    if (this.members().some((item) => item.id === member.id)) {
      return throwError(() => new Error('Team member already exists'));
    }
    this.members.update((items) => [...items, member]);
    return of(member);
  }

  update(member: TeamMember): Observable<TeamMember> {
    const items = this.members();
    const index = items.findIndex((item) => item.id === member.id);
    if (index === -1) {
      return throwError(() => new Error('Team member not found'));
    }
    const updated = [...items];
    updated[index] = member;
    this.members.set(updated);
    return of(member);
  }

  delete(id: string): Observable<void> {
    this.members.update((items) => items.filter((item) => item.id !== id));
    return of(void 0);
  }

  private createMember(id: string, name: string, position: string, bio: string, photo: string, social: SocialLink[]): TeamMember {
    return { id, name, position, bio, photo, social };
  }
}
