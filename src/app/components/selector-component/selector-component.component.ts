import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-selector-component',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './selector-component.component.html',
  styleUrl: './selector-component.component.scss'
})
export class SelectorComponent {
@Input() public items:Array<any> = [];
@Input() public destinyRoute:string = '';
}
