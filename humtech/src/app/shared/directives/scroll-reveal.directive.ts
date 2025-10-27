import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { gsap } from 'gsap';
import { GsapService, ScrollAnimationConfig } from '../animations/gsap.service';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  private readonly defaultConfig: ScrollAnimationConfig = {
    animation: {
      from: { opacity: 0, y: 32 },
      to: { opacity: 1, y: 0, duration: 1 },
      tween: {},
    },
  };

  private config: ScrollAnimationConfig = this.defaultConfig;

  @Input('appScrollReveal')
  set scrollConfig(config: ScrollAnimationConfig | '' | null | undefined) {
    if (!config || typeof config === 'string') {
      this.config = this.defaultConfig;
      return;
    }

    this.config = {
      ...this.defaultConfig,
      ...config,
      animation: {
        ...this.defaultConfig.animation,
        ...(config.animation ?? {}),
        from: {
          ...(this.defaultConfig.animation?.from ?? {}),
          ...(config.animation?.from ?? {}),
        },
        to: {
          ...(this.defaultConfig.animation?.to ?? {}),
          ...(config.animation?.to ?? {}),
        },
        tween: {
          ...(this.defaultConfig.animation?.tween ?? {}),
          ...(config.animation?.tween ?? {}),
        },
      },
    };
  }

  private context?: gsap.Context;

  constructor(private readonly elementRef: ElementRef, private readonly gsapService: GsapService) {}

  ngOnInit(): void {
    this.context = this.gsapService.animateOnScroll(this.elementRef.nativeElement, this.config);
  }

  ngOnDestroy(): void {
    this.gsapService.clearAnimations(this.context);
  }
}
