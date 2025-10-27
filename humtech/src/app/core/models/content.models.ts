export interface HeroContent {
  id: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaLink: string;
  secondaryCtaLabel?: string;
  secondaryCtaLink?: string;
  backgroundImage: string;
  highlights: string[];
}

export interface ServiceCategory {
  id: string;
  icon: string;
  title: string;
  description: string;
  link: string;
  features: string[];
  technologies: string[];
  process: Array<{ title: string; description: string }>;
  caseStudies: CaseStudy[];
}

export interface CaseStudy {
  id: string;
  client: string;
  summary: string;
  impact: string;
  image: string;
  link: string;
}

export interface StatMetric {
  id: string;
  label: string;
  value: number;
  suffix?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  photo: string;
  social: SocialLink[];
}

export interface SocialLink {
  id: string;
  platform: 'linkedin' | 'twitter' | 'github' | 'facebook' | 'instagram' | 'dribbble';
  url: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  review: string;
  rating: number;
  photo: string;
}

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  description: string;
  requirements: string[];
  postedDate: string;
  experienceLevel: 'Junior' | 'Mid' | 'Senior' | 'Lead';
}

export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
  content: string;
  tags: string[];
}

export interface ContactInformation {
  address: string;
  phone: string;
  email: string;
  social: SocialLink[];
  mapEmbedUrl: string;
  officeHours: string;
}

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  duration: string;
  schedule: string;
  instructorId: string;
  tags: string[];
  price: number;
  featured: boolean;
}

export interface Instructor {
  id: string;
  name: string;
  bio: string;
  photo: string;
  expertise: string[];
  social: SocialLink[];
}

export interface AcademyTestimonial {
  id: string;
  studentName: string;
  courseId: string;
  feedback: string;
  role: string;
  rating: number;
}

export interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  topic: string;
}

export interface ApplicationSubmission {
  jobId: string;
  name: string;
  email: string;
  phone: string;
  resumeUrl: string;
  coverLetter?: string;
  portfolioUrl?: string;
}

export interface ServiceFilter {
  search?: string;
  technologies?: string[];
  categories?: string[];
}
