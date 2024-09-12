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
  title = 'Olá Professor, seja muito bem vindo ao nosso formulário';

  descitpion =  'Essa pesquisa consiste em avaliarmos as competências e habilidades do ENEM que seus estudantes conseguiram desenvolver durante o ensino médio.'

  instructions = [
    'Se cadastre, caso tenha um cadastro escolha este;',
    'Ao se cadastrar, escolha sua instiuição, a série da sua turma e a turma respectva à série;',
    'Escolha uma área de conhecimento que deseja avaliar;',
    'Escolha uma disciplina e boa avaliação;',
    'As respostas são salvas automaticamente a cada disciplina avaliada.'
  ]
  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  constructor(private contexts: ChildrenOutletContexts) {}
}
