import { Component, OnInit } from '@angular/core';
import { SelectorComponent } from '../selector-component/selector-component.component';
import { RouterLink } from '@angular/router';
import { DisciplinasService } from '../../services/disciplinas.service';

@Component({
  selector: 'app-form-discipline-selector-component',
  standalone: true,
  imports: [SelectorComponent, RouterLink],
  templateUrl: './form-discipline-selector-component.component.html',
  styleUrl: './form-discipline-selector-component.component.scss'
})
export class FormDisciplineSelectorComponent  {
  diciplinasPorArea:any = { 
    LINGUAGENS: [ {nome: 'Português', id: 1}, {nome: 'Inglês', id: 2}, {nome: 'Espanhol', id: 3} ],
    EXATAS: [ {nome: 'Algebra', id: 4}, {nome: 'Geometria', id: 5}], 
    HUMANAS: [ {nome: 'História', id: 7}, {nome: 'Geografia', id: 8}, {nome: 'Filosofia', id: 9} ],
    NATUREZA: [ {nome: 'Biologia', id: 10}, {nome: 'Física', id: 11}, {nome: 'Química', id: 12} ]
  };

  disciplinas:Array<any> = [];

  areaSelecionada:string = '';

  color:string = '';

  constructor(private disciplinasService: DisciplinasService) {
    
  }

  getDisciplinas() {
    this.disciplinasService.getByArea(this.areaSelecionada).subscribe((data:any) => {
      this.disciplinas = data
        .filter((disciplina:any) => disciplina.serie_ano <= 3)
        .map((disciplina:any) => {
          return {
            title: `${disciplina.name} - ${disciplina.serie_ano} ° ano`,
            id: disciplina.id, 
            tag: disciplina.area, 
            color: this.color
          }
        }
      );

    });
  }

  ngOnInit() {
    this.areaSelecionada= history.state.itemData.tag;
    this.color = history.state.itemData.color;

    this.getDisciplinas();
    
  }

}
