import { useCallback, useEffect, useRef, useState } from 'react';
import type { ChatStep, TriggerNextStepData } from '../../types';
import type { SpeakFn } from '../../speechSynthesis';

interface UseStepOptions {
  step: ChatStep;
  previousValue: unknown;
  speak: SpeakFn;
  triggerNextStep: (data?: TriggerNextStepData) => void;
  /** the step waits the component to call triggerNextStep */
  waitAction?: boolean;
}

/**
 * Shows the loading while the delay of the step runs, then triggers the next
 * step (unless waitAction) and speaks the step
 */
const useStep = ({ step, previousValue, speak, triggerNextStep, waitAction }: UseStepOptions) => {
  const [loading, setLoading] = useState(true);
  const loadedRef = useRef(false);
  const triggeredRef = useRef(false);

  // a step can only trigger the next step once, even if the component is
  // mounted twice (React.StrictMode) or calls triggerNextStep more than once
  const triggerNextStepOnce = useCallback(
    (data?: TriggerNextStepData) => {
      if (triggeredRef.current) {
        return;
      }
      triggeredRef.current = true;
      triggerNextStep(data);
    },
    [triggerNextStep]
  );

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), step.delay);
    return () => clearTimeout(timeout);
  }, [step.delay]);

  useEffect(() => {
    if (loading || loadedRef.current) {
      return;
    }
    loadedRef.current = true;

    // cached steps already triggered the next step and were spoken
    if (step.rendered) {
      return;
    }
    if (!waitAction) {
      triggerNextStepOnce();
    }
    speak(step, previousValue);
  }, [loading, previousValue, speak, step, triggerNextStepOnce, waitAction]);

  return { loading, triggerNextStep: triggerNextStepOnce };
};

export default useStep;
