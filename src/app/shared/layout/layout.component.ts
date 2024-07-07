import { Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  title = 'rendezvous'; // Titre de l'application
  isSidebarClosed = false; // Indicateur de l'état de la barre latérale (ouverte ou fermée)
  private sidebarToggleSubscription!: Subscription; // Subscription pour écouter les changements de la barre latérale
  sideLinks!: NodeListOf<HTMLAnchorElement>; // Liste des liens de la barre latérale

  // Constructeur du composant
  constructor(private sharedservice: SharedService) {
    // Abonnement à l'observable `sidebarToggle$` pour écouter les changements de la barre latérale
    this.sidebarToggleSubscription = this.sharedservice.sidebarToggle$.subscribe(() => {
      this.isSidebarClosed = !this.isSidebarClosed;
    });
  }

  // Fonction d'initialisation du composant
  ngOnInit() {}

  // Écouteur d'événements pour les changements de taille de la fenêtre
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.toggleSidebar(event.target.innerWidth);
  }

  // Fonction pour basculer l'état de la barre latérale en fonction de la largeur de la fenêtre
  private toggleSidebar(windowWidth: number) {
    this.isSidebarClosed = windowWidth < 768;
  }
}
