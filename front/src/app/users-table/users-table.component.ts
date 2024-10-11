import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgForOf } from '@angular/common';

/**
 * Le composant UsersTableComponent est responsable de l'affichage de la liste des utilisateurs.
 * Il récupère les données des utilisateurs via le service ApiService et les affiche dans une table.
 */
@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  /**
   * Liste des utilisateurs récupérés à partir du backend.
   * @type {any[]}
   */
  users: any[] = [];

  /**
   * Crée une instance de UsersTableComponent.
   * @param {ApiService} apiService - Le service utilisé pour récupérer les utilisateurs.
   */
  constructor(private apiService: ApiService) {}

  /**
   * Méthode appelée automatiquement par Angular après l'initialisation du composant.
   * Elle déclenche la récupération des utilisateurs depuis l'API.
   */
  ngOnInit(): void {
    this.fetchUsers();
  }

  /**
   * Récupère la liste des utilisateurs à partir de l'API et met à jour la propriété `users`.
   * Gère également les erreurs en cas d'échec de la requête.
   */
  fetchUsers(): void {
    this.apiService.getUsers().subscribe(
      (data: any) => {
        this.users = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      }
    );
  }
}
