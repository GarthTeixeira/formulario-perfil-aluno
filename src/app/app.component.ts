import { Component } from '@angular/core';
import {
  ChildrenOutletContexts,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { MainFormComponent } from './components/main-form-component/main-form-component.component';
import { FormAreaSelectorComponent } from './components/form-area-selector-component/form-area-selector-component.component';
import { slideInAnimation } from './animations';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { InstructionsDialogComponent } from './components/instructions-dialog/instructions-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    MainFormComponent,
    FormAreaSelectorComponent,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [slideInAnimation],
})
export class AppComponent {
  title = 'Olá Professor, seja muito bem vindo ao nosso formulário';

  descitpion =
    'Essa pesquisa consiste em avaliarmos as competências e habilidades do ENEM que seus estudantes conseguiram desenvolver durante o ensino médio.';

  openDialog() {
    this.dialog.open(InstructionsDialogComponent);
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }

  constructor(
    private contexts: ChildrenOutletContexts,
    public dialog: MatDialog
  ) {}
}
