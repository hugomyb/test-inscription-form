import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {InscriptionFormComponent} from './inscription-form/inscription-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InscriptionFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'cours-1-1';
}
