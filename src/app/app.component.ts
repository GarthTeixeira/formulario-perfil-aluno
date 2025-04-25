import { Component, computed, inject } from '@angular/core';
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
import { ResponsiveService } from './services/responsive.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    MatButtonModule,
    MatDialogModule,
    NgClass
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [slideInAnimation],
})
export class AppComponent {

  responsiveService = inject(ResponsiveService);

  title = computed(() => {
    if (this.responsiveService.largeWidth()) {
      return 'Formulário de compentências do ENEM';
    } else {
      return 'Formulário';
    }
  }
  );

  descitpion =
    'Essa pesquisa consiste em avaliarmos as competências e habilidades do ENEM que seus estudantes conseguiram desenvolver durante o ensino médio.';

  layoutClass = computed(() => {
    if (this.responsiveService.smallWidth()) return 'mobile';
    if (this.responsiveService.mediumWidth()) return 'tablet';
    return 'desktop';
    
  });


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
