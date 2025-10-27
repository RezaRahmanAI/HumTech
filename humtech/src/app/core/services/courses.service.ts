import { Injectable, signal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { AcademyTestimonial, Course, Instructor } from '../models/content.models';

@Injectable({ providedIn: 'root' })
export class CoursesService {
  private readonly courses = signal<Course[]>([
    {
      id: 'fullstack-engineering',
      title: 'Full-Stack Engineering Accelerator',
      category: 'Technology',
      level: 'Advanced',
      description: '12-week immersive program covering Angular, ASP.NET Core, cloud-native patterns, and DevOps.',
      duration: '12 weeks',
      schedule: 'Cohort-based · Next cohort: March 2025',
      instructorId: 'marco-fernandez',
      tags: ['Angular', 'ASP.NET Core', 'DevOps'],
      price: 4200,
      featured: true,
    },
    {
      id: 'ai-strategy-lab',
      title: 'AI Strategy & Delivery Lab',
      category: 'Artificial Intelligence',
      level: 'Intermediate',
      description: 'Bridge the gap between AI experiments and production systems with governance, MLOps, and experimentation frameworks.',
      duration: '8 weeks',
      schedule: 'Hybrid · Next cohort: May 2025',
      instructorId: 'li-wei',
      tags: ['AI', 'Governance', 'MLOps'],
      price: 3600,
      featured: true,
    },
    {
      id: 'enterprise-sales',
      title: 'Enterprise Sales Leadership',
      category: 'Revenue',
      level: 'Intermediate',
      description: 'Sales enablement bootcamp covering MEDDIC, value engineering, and strategic account growth.',
      duration: '6 weeks',
      schedule: 'Live virtual · Next cohort: April 2025',
      instructorId: 'sylvia-mensah',
      tags: ['Sales', 'Enablement', 'Leadership'],
      price: 2800,
      featured: false,
    },
  ]);

  private readonly instructors = signal<Instructor[]>([
    {
      id: 'marco-fernandez',
      name: 'Marco Fernandez',
      bio: 'CTO at Hum Tech with two decades of experience building cloud-native and secure enterprise platforms.',
      photo: 'assets/images/instructors/marco-fernandez.webp',
      expertise: ['Cloud Architecture', 'Angular', 'DevSecOps'],
      social: [{ id: 'linkedin', platform: 'linkedin', url: 'https://linkedin.com/in/marco-fernandez' }],
    },
    {
      id: 'li-wei',
      name: 'Li Wei',
      bio: 'Head of Data Science specializing in Responsible AI and high-impact machine learning deployments.',
      photo: 'assets/images/instructors/li-wei.webp',
      expertise: ['Machine Learning', 'Responsible AI', 'Data Strategy'],
      social: [{ id: 'linkedin', platform: 'linkedin', url: 'https://linkedin.com/in/li-wei' }],
    },
    {
      id: 'sylvia-mensah',
      name: 'Sylvia Mensah',
      bio: 'Director of Product Strategy and revenue enablement advisor helping teams unlock customer value.',
      photo: 'assets/images/instructors/sylvia-mensah.webp',
      expertise: ['Product Strategy', 'Sales Enablement', 'Customer Success'],
      social: [{ id: 'linkedin', platform: 'linkedin', url: 'https://linkedin.com/in/sylvia-mensah' }],
    },
  ]);

  private readonly testimonials = signal<AcademyTestimonial[]>([
    {
      id: 'sarah-evans',
      studentName: 'Sarah Evans',
      courseId: 'fullstack-engineering',
      feedback: 'The accelerator gave me confidence to architect complex Angular applications and lead technical discussions with stakeholders.',
      role: 'Senior Frontend Engineer · Axis Financial',
      rating: 5,
    },
    {
      id: 'daniel-cho',
      studentName: 'Daniel Cho',
      courseId: 'enterprise-sales',
      feedback: 'The playbooks, role-playing, and coaching helped me unlock a 140% increase in closed revenue.',
      role: 'Account Executive · ScaleOps',
      rating: 4.7,
    },
  ]);

  getCourses(): Observable<Course[]> {
    return of(this.courses());
  }

  getCourseById(id: string): Observable<Course | undefined> {
    return of(this.courses().find((course) => course.id === id));
  }

  createCourse(course: Course): Observable<Course> {
    if (this.courses().some((item) => item.id === course.id)) {
      return throwError(() => new Error('Course already exists'));
    }
    this.courses.update((items) => [...items, course]);
    return of(course);
  }

  updateCourse(course: Course): Observable<Course> {
    const courses = this.courses();
    const index = courses.findIndex((item) => item.id === course.id);
    if (index === -1) {
      return throwError(() => new Error('Course not found'));
    }
    const updated = [...courses];
    updated[index] = course;
    this.courses.set(updated);
    return of(course);
  }

  deleteCourse(id: string): Observable<void> {
    this.courses.update((items) => items.filter((item) => item.id !== id));
    return of(void 0);
  }

  getInstructors(): Observable<Instructor[]> {
    return of(this.instructors());
  }

  getInstructorById(id: string): Observable<Instructor | undefined> {
    return of(this.instructors().find((instructor) => instructor.id === id));
  }

  getTestimonials(): Observable<AcademyTestimonial[]> {
    return of(this.testimonials());
  }
}
