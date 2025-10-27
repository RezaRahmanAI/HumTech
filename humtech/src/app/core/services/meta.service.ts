import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class MetaService {
  constructor(private readonly title: Title, private readonly meta: Meta) {}

  update(config: { title: string; description?: string }): void {
    if (config.title) {
      this.title.setTitle(`${config.title} | Hum Tech`);
    }
    if (config.description) {
      this.meta.updateTag({ name: 'description', content: config.description });
    }
  }
}
