import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface GalleryImage {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <figure *ngFor="let image of images" class="group overflow-hidden rounded-3xl border border-secondary-100">
        <img
          [src]="image.src"
          [alt]="image.alt"
          loading="lazy"
          class="h-56 w-full object-cover transition-transform group-hover:scale-105"
        />
      </figure>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageGalleryComponent {
  @Input() images: GalleryImage[] = [];
}
