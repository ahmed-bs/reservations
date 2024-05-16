import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isSidebarClosed = true;
  constructor(private sharedService: SharedService) { }

  toggleSidebar(): void {
    this.sharedService.toggleSidebar();
  }

  ngOnInit() {
  }

}
