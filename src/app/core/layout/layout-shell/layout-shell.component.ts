import { Component, inject, ViewChild, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TopbarComponent } from '../topbar/topbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-layout-shell',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    TopbarComponent,
    SidebarComponent
  ],
  templateUrl: './layout-shell.component.html',
  styleUrl: './layout-shell.component.scss'
})
export class LayoutShellComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly platformId = inject(PLATFORM_ID);
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  sidenavMode: 'side' | 'over' = 'side';
  sidenavOpened = true;
  private isHandset = false;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isHandset$.subscribe(isHandset => {
        this.isHandset = isHandset;
        this.sidenavMode = isHandset ? 'over' : 'side';
        this.sidenavOpened = !isHandset;
      });
    }
  }

  toggleSidenav(): void {
    this.sidenav.toggle();
  }

  onSidebarLinkClicked(): void {
    if (this.isHandset && this.sidenav) {
      this.sidenav.close();
    }
  }
}
