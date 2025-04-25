import { computed, inject, Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop'

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  private readonly small= '(max-width: 600px)';
  private readonly medium = '(min-width: 600px) and (max-width: 960px)';
  private readonly large = '(min-width: 960px)';

  breakpointObserver = inject(BreakpointObserver);

  screenwidth$ = this.breakpointObserver.observe([this.small, this.medium, this.large]);

  screenWidth = toSignal(this.screenwidth$);

  smallWidth = computed(() => {
    return this.screenWidth()?.breakpoints[this.small];
  });
  mediumWidth = computed(() => {
    return this.screenWidth()?.breakpoints[this.medium];
  });
  largeWidth = computed(() => {
    return this.screenWidth()?.breakpoints[this.large];
  });
  
}
