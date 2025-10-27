import { Injectable, signal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { CaseStudy, ServiceCategory } from '../models/content.models';

@Injectable({ providedIn: 'root' })
export class ServicesService {
  private readonly services = signal<ServiceCategory[]>([
    {
      id: 'erp',
      icon: 'ph:circles-three-plus',
      title: 'ERP Software Solutions',
      description: 'Integrated enterprise platforms tailored to streamline finance, operations, and customer success.',
      link: '/services/erp-software-solutions',
      features: [
        'Modular architecture with microservices-ready integration',
        'Advanced analytics dashboards and reporting',
        'Role-based access control and audit logging',
        'Seamless third-party integrations with SAP, Oracle, and Dynamics',
      ],
      technologies: ['.NET 8', 'Angular', 'Azure', 'Power BI'],
      process: [
        { title: 'Discovery & Alignment', description: 'Stakeholder workshops, KPI definition, and system blueprinting.' },
        { title: 'Architecture & Design', description: 'Domain-driven design with scalable cloud infrastructure blueprints.' },
        { title: 'Implementation', description: 'Agile delivery with CI/CD automation and rigorous QA.' },
        { title: 'Continuous Optimization', description: 'Hypercare support, performance tuning, and roadmap evolution.' },
      ],
      caseStudies: [
        this.createCaseStudy(
          'atlas-energy',
          'Atlas Energy',
          'Unified 6 disparate legacy systems into a single cloud-native ERP with AI-assisted forecasting.',
          '34% reduction in operating costs and 22% faster order fulfillment.',
          'assets/images/case-studies/atlas-energy.webp'
        ),
      ],
    },
    {
      id: 'android',
      icon: 'ph:android-logo',
      title: 'Android App Development',
      description: 'Human-centered Android apps with offline-first capabilities, stunning visuals, and secure integrations.',
      link: '/services/android-app-development',
      features: [
        'Native Kotlin development with Jetpack Compose',
        'Offline-first data synchronization',
        'End-to-end UX research and design sprints',
        'CI/CD pipelines with automated Play Store deployments',
      ],
      technologies: ['Kotlin', 'Jetpack Compose', 'Firebase', 'REST/GraphQL'],
      process: [
        { title: 'Product Strategy', description: 'Market research, persona mapping, and growth experiments.' },
        { title: 'Design System', description: 'Atomic design principles with accessibility-first components.' },
        { title: 'Engineering', description: 'Secure coding practices with automated testing and telemetry.' },
        { title: 'Growth & Success', description: 'Product analytics, A/B testing, and lifecycle marketing.' },
      ],
      caseStudies: [
        this.createCaseStudy(
          'medlink',
          'MedLink',
          'Mobile care coordination platform for multi-location clinics with HIPAA-grade security.',
          '4.8⭐ Play Store rating and 3x increase in patient engagement.',
          'assets/images/case-studies/medlink.webp'
        ),
      ],
    },
    {
      id: 'ai-projects',
      icon: 'ph:brain',
      title: 'Artificial Intelligence Projects',
      description: 'Strategy-led AI initiatives from predictive analytics to intelligent automation and copilots.',
      link: '/services/artificial-intelligence-projects',
      features: [
        'Responsible AI governance frameworks',
        'ModelOps pipeline with automated monitoring',
        'Custom LLM fine-tuning and retrieval augmented generation',
        'Edge AI deployments for IoT and computer vision',
      ],
      technologies: ['Azure OpenAI', 'TensorFlow', 'PyTorch', 'LangChain'],
      process: [
        { title: 'AI Readiness', description: 'Data maturity assessment and value hypothesis workshops.' },
        { title: 'Experimentation', description: 'Rapid prototyping with business-in-the-loop validation.' },
        { title: 'Operationalization', description: 'MLOps automation, bias mitigation, and human oversight guardrails.' },
        { title: 'Scale', description: 'Continuous learning loops and KPI-driven optimization.' },
      ],
      caseStudies: [
        this.createCaseStudy(
          'stellar-retail',
          'Stellar Retail',
          'Real-time demand forecasting and workforce optimization leveraging deep learning.',
          '18% revenue lift and 40% reduction in stockouts across 220 stores.',
          'assets/images/case-studies/stellar-retail.webp'
        ),
      ],
    },
    {
      id: 'harm-academy',
      icon: 'ph:graduation-cap',
      title: 'Harm Academy',
      description: 'Immersive tech and sales programs bridging the talent gap with industry-led mentorship.',
      link: '/harm-academy',
      features: [
        'Job-ready curriculum co-created with hiring partners',
        'Live workshops, labs, and simulations',
        'Career services with placement support',
        'Sales enablement bootcamps and certifications',
      ],
      technologies: ['Angular', 'Power BI', 'HubSpot', 'Salesforce'],
      process: [
        { title: 'Talent Strategy', description: 'Skills gap assessment and cohort design.' },
        { title: 'Learning Experience', description: 'Blended learning with instructor-led and asynchronous modules.' },
        { title: 'Assessment & Coaching', description: 'Performance analytics, mentoring, and personalized plans.' },
        { title: 'Placement', description: 'Hiring partner showcases and interview preparation.' },
      ],
      caseStudies: [
        this.createCaseStudy(
          'growth-guild',
          'Growth Guild',
          'Sales acceleration program for SaaS start-ups including playbooks and enablement assets.',
          '95% placement rate and 38% increase in ramp speed for graduates.',
          'assets/images/case-studies/growth-guild.webp'
        ),
      ],
    },
  ]);

  getAll(): Observable<ServiceCategory[]> {
    return of(this.services());
  }

  getById(id: string): Observable<ServiceCategory | undefined> {
    return of(this.services().find((service) => service.id === id));
  }

  create(service: ServiceCategory): Observable<ServiceCategory> {
    const exists = this.services().some((item) => item.id === service.id);
    if (exists) {
      return throwError(() => new Error('Service already exists'));
    }
    this.services.update((items) => [...items, service]);
    return of(service);
  }

  update(service: ServiceCategory): Observable<ServiceCategory> {
    const services = this.services();
    const index = services.findIndex((item) => item.id === service.id);
    if (index === -1) {
      return throwError(() => new Error('Service not found'));
    }
    const updated = [...services];
    updated[index] = service;
    this.services.set(updated);
    return of(service);
  }

  delete(id: string): Observable<void> {
    this.services.update((items) => items.filter((item) => item.id !== id));
    return of(void 0);
  }

  private createCaseStudy(id: string, client: string, summary: string, impact: string, image: string): CaseStudy {
    return {
      id,
      client,
      summary,
      impact,
      image,
      link: `/case-studies/${id}`,
    };
  }
}
