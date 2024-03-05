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
 constructor() {
  this.areas = areas;
 }
}
