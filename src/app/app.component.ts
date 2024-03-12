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
  title = 'Olá, seja muito bem vindo ao nosso formulário';

  descitpion =  'Seja muito bem vindo ao nosso formulário, essa pesquisa consiste em avaliarmos as competências e habilidades do enem que você conseguiu desenvolver durante o ensino médio.'

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  constructor(private contexts: ChildrenOutletContexts) {}
}
