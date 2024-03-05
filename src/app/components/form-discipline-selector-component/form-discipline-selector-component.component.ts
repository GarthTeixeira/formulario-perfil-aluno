import { Component } from '@angular/core';
import { SelectorComponent } from '../selector-component/selector-component.component';

@Component({
  selector: 'app-form-discipline-selector-component',
  standalone: true,
  imports: [SelectorComponent],
  templateUrl: './form-discipline-selector-component.component.html',
  styleUrl: './form-discipline-selector-component.component.scss'
})
export class FormDisciplineSelectorComponent {
  diciplinasPorArea:any = { 
    LINGUAGENS: [ {nome: 'Português', id: 1}, {nome: 'Inglês', id: 2}, {nome: 'Espanhol', id: 3} ],
    EXATAS: [ {nome: 'Algebra', id: 4}, {nome: 'Geometria', id: 5}], 
    HUMANAS: [ {nome: 'História', id: 7}, {nome: 'Geografia', id: 8}, {nome: 'Filosofia', id: 9} ],
    NATUREZA: [ {nome: 'Biologia', id: 10}, {nome: 'Física', id: 11}, {nome: 'Química', id: 12} ]
  };

  disciplinas:Array<any> = [];

  constructor() {
    
  }
}
