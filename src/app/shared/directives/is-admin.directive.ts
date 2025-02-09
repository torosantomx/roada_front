import { Directive, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { SessionService } from '@services/session.service';

@Directive({
  selector: '[appIsAdmin]'
})
export class IsAdminDirective {

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {
    this.applyLogic();
  }

  private sesionService = inject(SessionService);
  public showOnlyAmdins = input.required<boolean>();


  private hasView = false;

  private applyLogic() {
    const shouldRender = true
    if (shouldRender && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!shouldRender && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
