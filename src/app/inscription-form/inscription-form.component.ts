import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription-form.component.html',
  styleUrls: ['./inscription-form.component.css'],
  standalone: true,
  imports: [
    CommonModule, // Utilise uniquement CommonModule ici
    ReactiveFormsModule
  ],
})
export class InscriptionFormComponent {
  inscriptionForm: FormGroup;

  constructor(protected fb: FormBuilder, private toastr: ToastrService) {
    this.inscriptionForm = this.fb.group({
      nom: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s'-]+$/)]],
      prenom: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s'-]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      dateNaissance: ['', [Validators.required, this.validateAge]],
      ville: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s'-]+$/)]],
      codePostal: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
    });
  }

  get nom() { return this.inscriptionForm.get('nom'); }
  get prenom() { return this.inscriptionForm.get('prenom'); }
  get email() { return this.inscriptionForm.get('email'); }
  get dateNaissance() { return this.inscriptionForm.get('dateNaissance'); }
  get ville() { return this.inscriptionForm.get('ville'); }
  get codePostal() { return this.inscriptionForm.get('codePostal'); }

  validateAge(control: any) {
    const birthDate = new Date(control.value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 18) {
      return { minAge: true };
    }
    return null;
  }

  onSubmit() {
    if (this.inscriptionForm.valid) {
      console.log('Formulaire soumis avec succès', this.inscriptionForm.value);
      this.toastr.success('Inscription réussie !', 'Succès');
      this.inscriptionForm.reset();
    }
  }
}
