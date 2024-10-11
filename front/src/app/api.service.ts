import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  /**
   * Envoie les données du formulaire d'inscription au backend pour créer un utilisateur.
   * @param userData - Les données de l'utilisateur provenant du formulaire d'inscription.
   * @returns Observable<any> - La réponse du backend.
   */
  createUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, userData);
  }

  /**
   * Récupère la liste des utilisateurs depuis le backend.
   * @returns Observable<any> - La liste des utilisateurs.
   */
  getUsers(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }
}
