import { Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {


  ngOnInit() {
  }
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