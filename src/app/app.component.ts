import { Component, computed, inject, signal, Signal } from '@angular/core';
import {
  ChildrenOutletContexts,
  NavigationEnd,
  Router,
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
import { LocalStorageService } from './shared/services/local-storage-service.service';
import { filter } from 'rxjs';

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
export class AppComponent{
  
  private contexts = inject(ChildrenOutletContexts);

  public dialog = inject(MatDialog);

  responsiveService = inject(ResponsiveService);

  localStorageService = inject(LocalStorageService);

  router = inject(Router);

  get turmaSelected(){
    return this.localStorageService.getItem('userData')['turma']['nome'];
  }

  currentRoute = signal(this.router.url);

  title:Signal<string> = computed(() => {
    if (this.responsiveService.largeWidth()) {
      return 'Formulário de compentências do ENEM';
    } else {
      return 'Formulário';
    }
  });

  isInAvailableRoute:Signal<boolean> = computed(() => {
    const value = ['selecionar-formulario', 'home', 'cadastro'].some((route: string) => 
      this.currentRoute().includes(route)
    );
    console.log(value)
    return value;
  });

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

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event) => {
        this.currentRoute.set(event.url);
        console.log('Rota alterada:', this.currentRoute());
      });
  }
  
}
