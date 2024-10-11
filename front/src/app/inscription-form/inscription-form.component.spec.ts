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
    expect(screen.getByLabelText('Nom :')).toBeTruthy();
    expect(screen.getByLabelText('Prénom :')).toBeTruthy();
    expect(screen.getByLabelText('Email :')).toBeTruthy();
    expect(screen.getByLabelText('Date de naissance :')).toBeTruthy();
    expect(screen.getByLabelText('Ville :')).toBeTruthy();
    expect(screen.getByLabelText('Code Postal :')).toBeTruthy();
  });

  it('should disable the submit button if the form is invalid', () => {
    const submitButton = screen.getByRole('button', { name: /Confirmer/i });
    expect(submitButton.hasAttribute('disabled')).toBe(true);
  });

  it('should show error messages when fields are touched but empty', async () => {
    const nomInput = screen.getByLabelText('Nom :');
    fireEvent.blur(nomInput);

    expect(await screen.findByText('Le nom est requis.')).toBeTruthy();
  });

  it('should enable the submit button when the form is valid', async () => {
    fireEvent.input(screen.getByLabelText('Nom :'), { target: { value: 'Dupont' } });
    fireEvent.input(screen.getByLabelText('Prénom :'), { target: { value: 'Jean' } });
    fireEvent.input(screen.getByLabelText('Email :'), { target: { value: 'jean.dupont@example.com' } });
    fireEvent.input(screen.getByLabelText('Date de naissance :'), { target: { value: '2000-01-01' } });
    fireEvent.input(screen.getByLabelText('Ville :'), { target: { value: 'Paris' } });
    fireEvent.input(screen.getByLabelText('Code Postal :'), { target: { value: '75001' } });

    const submitButton = screen.getByRole('button', { name: /Confirmer/i });
    expect(submitButton.hasAttribute('disabled')).toBe(false);
  });

  it('should show an error message when the age is less than 18', async () => {
    fireEvent.input(screen.getByLabelText('Nom :'), { target: { value: 'Dupont' } });
    fireEvent.input(screen.getByLabelText('Prénom :'), { target: { value: 'Jean' } });
    fireEvent.input(screen.getByLabelText('Email :'), { target: { value: 'jean.dupont@example.com' } });
    fireEvent.input(screen.getByLabelText('Date de naissance :'), { target: { value: '2010-01-01' } });
    fireEvent.input(screen.getByLabelText('Ville :'), { target: { value: 'Paris' } });
    fireEvent.input(screen.getByLabelText('Code Postal :'), { target: { value: '75001' } });

    fireEvent.click(screen.getByRole('button', { name: /Confirmer/i }));

    const errorMessage = await screen.findByText('Vous devez avoir au moins 18 ans.');
    expect(errorMessage).toBeTruthy();
  });

  it('should show a success toaster message on form submission', async () => {
    fireEvent.input(screen.getByLabelText('Nom :'), { target: { value: 'Dupont' } });
    fireEvent.input(screen.getByLabelText('Prénom :'), { target: { value: 'Jean' } });
    fireEvent.input(screen.getByLabelText('Email :'), { target: { value: 'jean.dupont@example.com' } });
    fireEvent.input(screen.getByLabelText('Date de naissance :'), { target: { value: '2000-01-01' } });
    fireEvent.input(screen.getByLabelText('Ville :'), { target: { value: 'Paris' } });
    fireEvent.input(screen.getByLabelText('Code Postal :'), { target: { value: '75001' } });

    fireEvent.click(screen.getByRole('button', { name: /Confirmer/i }));

    const toasterMessage = await screen.findByText('Inscription réussie !');
    expect(toasterMessage).toBeTruthy();
  });
});
