import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  sideLinks!: NodeListOf<HTMLAnchorElement>;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { 

  }

  ngOnInit() {
    
  }
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
  }




}
