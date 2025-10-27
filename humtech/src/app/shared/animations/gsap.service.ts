import { Injectable, NgZone } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollAnimationTweens {
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  tween?: gsap.TweenVars;
}

export interface ScrollAnimationConfig {
  trigger?: Element | string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  once?: boolean;
  animation?: ScrollAnimationTweens;
  toggleActions?: string;
  markers?: boolean;
}

@Injectable({ providedIn: 'root' })
export class GsapService {
  constructor(private readonly ngZone: NgZone) {}

  animateOnScroll(element: Element, config: ScrollAnimationConfig): gsap.Context {
    return this.ngZone.runOutsideAngular(() =>
      gsap.context(() => {
        const trigger = config.trigger ?? element;
        const animation = config.animation ?? {};
        const tweenConfig: gsap.TweenVars = {
          ease: 'power2.out',
          ...(animation.tween ?? {}),
          scrollTrigger: {
            trigger,
            start: config.start ?? 'top 80%',
            end: config.end ?? 'bottom 20%',
            scrub: config.scrub ?? true,
            toggleActions: config.toggleActions ?? 'play reverse play reverse',
            markers: config.markers ?? false,
          },
        };

        gsap.fromTo(
          element,
          animation.from ?? { opacity: 0, y: 24 },
          {
            ...(animation.to ?? {}),
            ...tweenConfig,
          }
        );
      }, element)
    );
  }

  clearAnimations(scope: gsap.Context | undefined): void {
    scope?.revert();
  }
}
