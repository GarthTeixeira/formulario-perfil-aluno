import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { areas } from '../../utils/areas';
import { SelectorComponent } from '../selector-component/selector-component.component';
@Component({
  selector: 'app-form-area-selector-component',
  standalone: true,
  imports: [SelectorComponent],
  templateUrl: './form-area-selector-component.component.html',
  styleUrl: './form-area-selector-component.component.scss'
})
export class FormAreaSelectorComponent {
  areas:Array<any> = [];
  cores:Array<string> = ['primary', 'secondary', 'tertiary', 'quaternary'];
 constructor() {

  for (let i = 0; i < areas.length; i++) {
    this.areas[i] =  {...areas[i], color: this.cores[i]};
  }
  console.log(this.areas);
 }
}
