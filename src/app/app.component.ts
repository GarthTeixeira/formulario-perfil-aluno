import { Component } from '@angular/core';
import { ChildrenOutletContexts, RouterModule, RouterOutlet } from '@angular/router';
import { MainFormComponent } from './components/main-form-component/main-form-component.component';
import { FormAreaSelectorComponent } from './components/form-area-selector-component/form-area-selector-component.component';
import { slideInAnimation } from './animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, MainFormComponent, FormAreaSelectorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    slideInAnimation 
  ]
})
export class AppComponent {
  title = 'Olá bem vindo ao nosso formulário';

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  constructor(private contexts: ChildrenOutletContexts) {}
}
