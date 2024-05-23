import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Subscription, filter } from 'rxjs';
import { SharedService } from '../shared.service';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  sideLinks!: NodeListOf<HTMLAnchorElement>;

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private router: Router) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.sideLinks = this.elementRef.nativeElement.querySelectorAll('.sidebar .side-menu li a:not(.logout)');
    this.sideLinks.forEach(item => {
      const li = item.parentElement;
      item.addEventListener('click', () => {
        this.sideLinks.forEach(i => {
          this.renderer.removeClass(i.parentElement, 'active');
        });
        this.renderer.addClass(li, 'active');
      });
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateActiveLink();
    });

    this.updateActiveLink();
  }

  private updateActiveLink(): void {
    this.sideLinks.forEach(item => {
      const li = item.parentElement;
      const href = item.getAttribute('routerLink');
      if (this.router.url === href) {
        this.renderer.addClass(li, 'active');
      } else {
        this.renderer.removeClass(li, 'active');
      }
    });
  }




}
