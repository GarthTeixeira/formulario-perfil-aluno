import { Component, OnInit } from '@angular/core';
import { SelectorComponent } from '../selector-component/selector-component.component';
import { RouterLink } from '@angular/router';
import { DisciplinasService } from '../../services/disciplinas.service';
import { DisciplinaSelectItem } from '../../types/componentsTypes';
import { Disciplina } from '../../types/serviceTypes';

@Component({
  selector: 'app-form-discipline-selector-component',
  standalone: true,
  imports: [SelectorComponent, RouterLink],
  templateUrl: './form-discipline-selector-component.component.html',
  styleUrl: './form-discipline-selector-component.component.scss'
})
export class FormDisciplineSelectorComponent  {
  
  disciplinas:Array<DisciplinaSelectItem> = [];

  areaSelecionada:string = '';

  color:string = '';

  constructor(private disciplinasService: DisciplinasService) {
    
  }

  getDisciplinas() {
    this.disciplinasService.getByAreaWithActualSerie(this.areaSelecionada).subscribe((data:any) => {
      this.disciplinas = data
        .filter((disciplina:Disciplina) => disciplina.serie_ano <= 3)
        .map((disciplina:Disciplina) => {
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
