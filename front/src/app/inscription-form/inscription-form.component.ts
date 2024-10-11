import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

/**
 * Component for handling the user registration form.
 */
@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription-form.component.html',
  styleUrls: ['./inscription-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
})
export class InscriptionFormComponent {
  /**
   * The registration form group object.
   * @type {FormGroup}
   */
  inscriptionForm: FormGroup;

  /**
   * Constructor to initialize the form builder and Toastr service.
   * @param {FormBuilder} fb - Angular FormBuilder service to create form groups and controls.
   * @param {ToastrService} toastr - Service to display toast notifications.
   */
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

  /**
   * Getter for the 'nom' form control.
   * @returns {AbstractControl | null} The form control for 'nom'.
   */
  get nom() { return this.inscriptionForm.get('nom'); }

  /**
   * Getter for the 'prenom' form control.
   * @returns {AbstractControl | null} The form control for 'prenom'.
   */
  get prenom() { return this.inscriptionForm.get('prenom'); }

  /**
   * Getter for the 'email' form control.
   * @returns {AbstractControl | null} The form control for 'email'.
   */
  get email() { return this.inscriptionForm.get('email'); }

  /**
   * Getter for the 'dateNaissance' form control.
   * @returns {AbstractControl | null} The form control for 'dateNaissance'.
   */
  get dateNaissance() { return this.inscriptionForm.get('dateNaissance'); }

  /**
   * Getter for the 'ville' form control.
   * @returns {AbstractControl | null} The form control for 'ville'.
   */
  get ville() { return this.inscriptionForm.get('ville'); }

  /**
   * Getter for the 'codePostal' form control.
   * @returns {AbstractControl | null} The form control for 'codePostal'.
   */
  get codePostal() { return this.inscriptionForm.get('codePostal'); }

  /**
   * Custom validator to check if the user is at least 18 years old.
   * @param {AbstractControl} control - The form control to validate.
   * @returns {Object | null} An object with a validation error if the user is under 18, or null if valid.
   */
  validateAge(control: any) {
    const birthDate = new Date(control.value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 18) {
      return { minAge: true };
    }
    return null;
  }

  /**
   * Handles the form submission event.
   * Displays a success message if the form is valid and resets the form.
   */
  onSubmit() {
    if (this.inscriptionForm.valid) {
      console.log('Formulaire soumis avec succès', this.inscriptionForm.value);
      this.toastr.success('Inscription réussie !', 'Succès');
      this.inscriptionForm.reset();
    }
  }
}
