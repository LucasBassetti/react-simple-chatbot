import { act, fireEvent } from '@testing-library/react';

export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/** let the timeouts of the steps run */
export const settle = async (ms = 100) => {
  await act(async () => {
    await wait(ms);
  });
};

export const bubbles = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('.rsc-ts-bubble')).map(el => el.textContent);

export const getInput = (container: HTMLElement) =>
  container.querySelector('input.rsc-input') as HTMLInputElement;

export const typeMessage = (container: HTMLElement, value: string) => {
  const input = getInput(container);
  fireEvent.change(input, { target: { value } });
  fireEvent.keyDown(input, { key: 'Enter' });
};
