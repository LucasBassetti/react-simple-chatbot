import React, { StrictMode, act } from 'react';
import { createRoot } from 'react-dom/client';

import { describe, it, before, after } from 'mocha';
import { expect } from 'chai';
import ChatBot from '../../lib/ChatBot';

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('ChatBot in StrictMode', () => {
  let container;
  let root;

  before(async () => {
    global.IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
    await act(async () => {
      root.render(
        <StrictMode>
          <ChatBot
            botDelay={0}
            userDelay={0}
            customDelay={0}
            steps={[
              { id: '1', message: 'first', trigger: '2' },
              { id: '2', message: 'second', trigger: '3' },
              { id: '3', message: 'third', end: true }
            ]}
          />
        </StrictMode>
      );
    });
    for (let i = 0; i < 10; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await act(async () => {
        await wait(20);
      });
    }
  });

  after(() => {
    act(() => root.unmount());
    container.remove();
    global.IS_REACT_ACT_ENVIRONMENT = false;
  });

  it('should render each message only once', () => {
    const bubbles = Array.from(container.querySelectorAll('.rsc-ts-bubble')).map(
      el => el.textContent
    );
    expect(bubbles).to.deep.equal(['first', 'second', 'third']);
  });

  describe('custom component calling triggerNextStep twice', () => {
    let container2;
    let root2;

    const DoubleTrigger = ({ triggerNextStep }) => {
      React.useEffect(() => {
        triggerNextStep();
        triggerNextStep();
      }, []);
      return <span>custom</span>;
    };

    before(async () => {
      container2 = document.createElement('div');
      document.body.appendChild(container2);
      root2 = createRoot(container2);
      await act(async () => {
        root2.render(
          <ChatBot
            botDelay={0}
            userDelay={0}
            customDelay={0}
            steps={[
              { id: '1', component: <DoubleTrigger />, waitAction: true, trigger: '2' },
              { id: '2', message: 'next', end: true }
            ]}
          />
        );
      });
      for (let i = 0; i < 10; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        await act(async () => {
          await wait(20);
        });
      }
    });

    after(() => {
      act(() => root2.unmount());
      container2.remove();
    });

    it('should trigger the next step only once', () => {
      const bubbles = Array.from(container2.querySelectorAll('.rsc-ts-bubble')).map(
        el => el.textContent
      );
      expect(bubbles).to.deep.equal(['next']);
    });
  });
});
