import {fireEvent, render} from '@testing-library/angular';
import {AppComponent} from './app.component';

describe('AppComponent', () => {
  it('should contain the h1 tag with "Test component"', async () => {
    const {getByText} = await render(AppComponent);
    expect(getByText('Hello Component')).toBeTruthy();
  });

  it('should increment the counter on button click', async () => {
    const {getByText, getByRole} = await render(AppComponent);

    const button = getByRole('button');
    const initialCounterText = getByText('0');
    expect(initialCounterText).toBeTruthy();

    fireEvent.click(button);

    const incrementedCounterText = getByText('1');
    expect(incrementedCounterText).toBeTruthy();
  });
});
