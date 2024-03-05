import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainFormComponent } from './components/main-form-component/main-form-component.component';
import { FormAreaSelectorComponent } from './components/form-area-selector-component/form-area-selector-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainFormComponent, FormAreaSelectorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Olá bem vindo ao nosso formulário';
}
