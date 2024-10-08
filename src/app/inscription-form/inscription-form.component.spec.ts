import { fireEvent, render, screen } from '@testing-library/angular';
import { InscriptionFormComponent } from './inscription-form.component';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('InscriptionFormComponent', () => {
  beforeEach(async () => {
    await render(InscriptionFormComponent, {
      imports: [ReactiveFormsModule, ToastrModule.forRoot(), BrowserAnimationsModule],
    });
  });

  it('should render the form fields', () => {
    expect(screen.getByLabelText(/Nom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Prénom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date de naissance/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Ville/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Code Postal/i)).toBeInTheDocument();
  });

  it('should disable the submit button if the form is invalid', () => {
    const submitButton = screen.getByRole('button', { name: /Sauvegarder/i });
    expect(submitButton).toBeDisabled();
  });

  it('should show error messages when fields are touched but empty', async () => {
    const nomInput = screen.getByLabelText(/Nom/i);
    fireEvent.blur(nomInput); // Simule le fait de quitter le champ sans le remplir

    expect(await screen.findByText('Le nom est requis.')).toBeInTheDocument();
  });

  it('should enable the submit button when the form is valid', async () => {
    fireEvent.input(screen.getByLabelText(/Nom/i), { target: { value: 'Dupont' } });
    fireEvent.input(screen.getByLabelText(/Prénom/i), { target: { value: 'Jean' } });
    fireEvent.input(screen.getByLabelText(/Email/i), { target: { value: 'jean.dupont@example.com' } });
    fireEvent.input(screen.getByLabelText(/Date de naissance/i), { target: { value: '2000-01-01' } });
    fireEvent.input(screen.getByLabelText(/Ville/i), { target: { value: 'Paris' } });
    fireEvent.input(screen.getByLabelText(/Code Postal/i), { target: { value: '75001' } });

    const submitButton = screen.getByRole('button', { name: /Sauvegarder/i });
    expect(submitButton).not.toBeDisabled();
  });

  it('should show a success toaster message on form submission', async () => {
    fireEvent.input(screen.getByLabelText(/Nom/i), { target: { value: 'Dupont' } });
    fireEvent.input(screen.getByLabelText(/Prénom/i), { target: { value: 'Jean' } });
    fireEvent.input(screen.getByLabelText(/Email/i), { target: { value: 'jean.dupont@example.com' } });
    fireEvent.input(screen.getByLabelText(/Date de naissance/i), { target: { value: '2000-01-01' } });
    fireEvent.input(screen.getByLabelText(/Ville/i), { target: { value: 'Paris' } });
    fireEvent.input(screen.getByLabelText(/Code Postal/i), { target: { value: '75001' } });

    fireEvent.click(screen.getByRole('button', { name: /Sauvegarder/i }));

    expect(await screen.findByText('Inscription réussie !')).toBeInTheDocument();
  });
});
