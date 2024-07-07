import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isSidebarClosed = true; // Variable pour suivre l'état de la barre latérale (ouverte ou fermée)

  constructor(private sharedService: SharedService) { }

  // Fonction pour basculer l'état de la barre latérale en appelant le service partagé
  toggleSidebar(): void {
    this.sharedService.toggleSidebar();
  }

  // Fonction appelée lors de l'initialisation du composant
  ngOnInit() {
  }
}
