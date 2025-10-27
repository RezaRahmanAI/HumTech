import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from '../pipes/safe-url.pipe';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe],
  template: `
    <div class="relative overflow-hidden rounded-3xl border border-secondary-100 bg-secondary-900">
      <iframe
        class="h-64 w-full md:h-96"
        [src]="src | safeUrl"
        title="Video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoPlayerComponent {
  @Input({ required: true }) src!: string;
}
