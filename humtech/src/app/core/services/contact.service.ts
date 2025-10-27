import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ContactInformation, ContactRequest } from '../models/content.models';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly contactInfo = signal<ContactInformation>({
    address: '120 King Street West, Suite 2500, Toronto, ON M5H 1A9',
    phone: '+1 (416) 555-0120',
    email: 'hello@humtech.com',
    social: [
      { id: 'linkedin', platform: 'linkedin', url: 'https://linkedin.com/company/humtech' },
      { id: 'twitter', platform: 'twitter', url: 'https://twitter.com/humtech' },
      { id: 'facebook', platform: 'facebook', url: 'https://facebook.com/humtech' },
    ],
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.229596335738!2d-79.38295532345098!3d43.64869267110368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34d721ec1b5f%3A0xa0df769207d88b1a!2s120%20King%20St%20W%20%232500%2C%20Toronto%2C%20ON%20M5H%201A9!5e0!3m2!1sen!2sca!4v1706305668652!5m2!1sen!2sca',
    officeHours: 'Monday - Friday · 8:30am - 6:00pm EST',
  });

  getContactInformation(): Observable<ContactInformation> {
    return of(this.contactInfo());
  }

  submitRequest(request: ContactRequest): Observable<ContactRequest> {
    console.info('Contact request submitted', request);
    return of(request);
  }
}
