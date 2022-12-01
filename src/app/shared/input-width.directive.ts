import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputWidth]'
})
export class InputWidthDirective {

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.width = '163px'
  }

  @HostListener('focus') onFocus() {
    this.el.nativeElement.style.width = '42%';
    this.el.nativeElement.classList.add('animationCard')
  }

  @HostListener('blur') onBlur() {
    this.el.nativeElement.style.width = '163px';
  }
}
