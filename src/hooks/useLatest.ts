import { useEffect, useLayoutEffect, useRef } from 'react';

// useLayoutEffect warns when rendered on the server
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Keep the latest value in a ref, so the callbacks called later (timeouts,
 * effects of the steps, speech recognition) read the current value
 */
const useLatest = <T>(value: T) => {
  const ref = useRef(value);
  useIsomorphicLayoutEffect(() => {
    ref.current = value;
  });
  return ref;
};

export default useLatest;
