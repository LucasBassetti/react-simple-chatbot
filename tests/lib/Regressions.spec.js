import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import { spy } from 'sinon';
import ChatBot from '../../lib/ChatBot';

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const flush = async () => {
  for (let i = 0; i < 10; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await act(async () => {
      await wait(10);
    });
  }
};

describe('ChatBot regressions', () => {
  let container;
  let root;

  const render = async element => {
    await act(async () => {
      root.render(element);
    });
    await flush();
  };

  const bubbles = () =>
    Array.from(container.querySelectorAll('.rsc-ts-bubble')).map(el => el.textContent);

  beforeEach(() => {
    global.IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    global.IS_REACT_ACT_ENVIRONMENT = false;
  });

  it('should select options without value by their label', async () => {
    await render(
      <ChatBot
        botDelay={0}
        userDelay={0}
        customDelay={0}
        steps={[
          {
            id: '1',
            options: [
              { label: 'first', trigger: 'a' },
              { label: 'second', trigger: 'b' }
            ]
          },
          { id: 'a', message: 'chose first', end: true },
          { id: 'b', message: 'chose second', end: true }
        ]}
      />
    );

    const buttons = container.querySelectorAll('.rsc-os-option-element');
    await act(async () => {
      buttons[1].click();
    });
    await flush();

    expect(bubbles()).to.deep.equal(['second', 'chose second']);
  });

  it('should use steps updated after mount', async () => {
    const steps = [
      { id: '1', message: 'hello', trigger: '2' },
      { id: '2', user: true, trigger: '3' },
      { id: '3', message: 'old', end: true }
    ];
    await render(<ChatBot botDelay={0} userDelay={0} customDelay={0} steps={steps} />);

    const newSteps = [steps[0], steps[1], { id: '3', message: 'new', end: true }];
    await render(<ChatBot botDelay={0} userDelay={0} customDelay={0} steps={newSteps} />);

    const input = container.querySelector('input.rsc-input');
    const setValue = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')
      .set;
    await act(async () => {
      setValue.call(input, 'hi');
      input.dispatchEvent(new window.Event('input', { bubbles: true }));
    });
    await act(async () => {
      input.dispatchEvent(
        new window.KeyboardEvent('keypress', { key: 'Enter', charCode: 13, bubbles: true })
      );
    });
    await flush();

    expect(bubbles()).to.deep.equal(['hello', 'hi', 'new']);
  });

  it('should not pass step props to DOM element components', async () => {
    const error = spy(console, 'error');
    try {
      await render(
        <ChatBot
          botDelay={0}
          userDelay={0}
          customDelay={0}
          steps={[
            { id: '1', component: <div className="dom-component">dom</div>, trigger: '2' },
            { id: '2', component: <div className="dom-message">msg</div>, asMessage: true, end: true }
          ]}
        />
      );
    } finally {
      error.restore();
    }

    expect(container.querySelector('.dom-component')).to.not.equal(null);
    expect(container.querySelector('.dom-message')).to.not.equal(null);
    const unknownPropWarnings = error.args.filter(args =>
      String(args[0]).includes('React does not recognize')
    );
    expect(unknownPropWarnings).to.have.length(0);
  });

  it('should keep the last message visible unless the user scrolled up', async () => {
    await render(
      <ChatBot
        botDelay={0}
        userDelay={0}
        customDelay={0}
        steps={[
          { id: '1', message: 'hello', trigger: '2' },
          { id: '2', user: true, trigger: '3' },
          { id: '3', message: 'bye', end: true }
        ]}
      />
    );

    const content = container.querySelector('.rsc-content');
    Object.defineProperty(content, 'scrollHeight', { value: 1000, configurable: true });
    Object.defineProperty(content, 'clientHeight', { value: 100, configurable: true });
    const mutate = async () => {
      await act(async () => {
        content.firstChild.appendChild(document.createElement('span'));
        await wait(0);
      });
    };

    await mutate();
    expect(content.scrollTop).to.equal(1000);

    // the user scrolls up to read
    await act(async () => {
      content.scrollTop = 200;
      content.dispatchEvent(new window.Event('scroll'));
    });
    await mutate();
    expect(content.scrollTop).to.equal(200);

    // a new message scrolls to the bottom again
    const input = container.querySelector('input.rsc-input');
    const setValue = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')
      .set;
    await act(async () => {
      setValue.call(input, 'hi');
      input.dispatchEvent(new window.Event('input', { bubbles: true }));
    });
    await act(async () => {
      input.dispatchEvent(
        new window.KeyboardEvent('keypress', { key: 'Enter', charCode: 13, bubbles: true })
      );
    });
    await flush();
    expect(content.scrollTop).to.equal(1000);
  });
});
