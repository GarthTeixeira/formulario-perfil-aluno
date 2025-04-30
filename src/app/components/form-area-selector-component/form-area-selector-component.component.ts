import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { areas } from '../../utils/areas';
import { SelectorComponent } from '../selector-component/selector-component.component';
import { DataSharedService } from '../../shared/data-shared.service';
import { AreasSelectItem } from '../../types/componentsTypes';
@Component({
  selector: 'app-form-area-selector-component',
  standalone: true,
  imports: [SelectorComponent,RouterLink],
  templateUrl: './form-area-selector-component.component.html',
  styleUrl: './form-area-selector-component.component.scss'
})
export class FormAreaSelectorComponent {
  areas:Array<AreasSelectItem> = [];
  answeredForm:boolean = false;
  cores:Array<string> = ['primary', 'secondary', 'tertiary', 'quaternary'];

 constructor(
  private dataSharedService: DataSharedService
 ) {}

 ngOnInit() {

  for (let i = 0; i < areas.length; i++) {
    this.areas[i] =  {...areas[i], color: this.cores[i]};
  }
  this.answeredForm = this.dataSharedService.getData() === 'formulario-preenchido'
  
}
}
