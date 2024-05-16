import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from './shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rendezvous';
  isSidebarClosed = false;
  private sidebarToggleSubscription!: Subscription;
  sideLinks!: NodeListOf<HTMLAnchorElement>;

  constructor(private sharedservice : SharedService) { 
    this.sidebarToggleSubscription = this.sharedservice.sidebarToggle$.subscribe(() => {
      this.isSidebarClosed = !this.isSidebarClosed;
    });
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.toggleSidebar(event.target.innerWidth);
  }

  private toggleSidebar(windowWidth: number) {
    this.isSidebarClosed = windowWidth < 768;
  }

}
