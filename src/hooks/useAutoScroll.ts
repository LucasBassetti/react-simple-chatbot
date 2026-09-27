import { useCallback, useEffect, useRef, type RefObject } from 'react';

// distance (px) to the bottom still considered the bottom
const BOTTOM_THRESHOLD = 40;

/**
 * Keep the last message visible, unless the user scrolled up to read.
 * A new message always brings the conversation to the bottom.
 * @returns the scroll handler of the content
 */
const useAutoScroll = (
  contentRef: RefObject<HTMLElement | null>,
  messagesCount: number,
  enableSmoothScroll: boolean
) => {
  const stickToBottomRef = useRef(true);
  const distanceToBottomRef = useRef(0);
  const messagesCountRef = useRef(0);

  const scrollToBottom = useCallback(() => {
    const content = contentRef.current;
    if (!content) {
      return;
    }

    if (enableSmoothScroll && 'scrollBehavior' in document.documentElement.style) {
      content.scroll({
        top: content.scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
    } else {
      content.scrollTop = content.scrollHeight;
    }
  }, [contentRef, enableSmoothScroll]);

  // the messages grow after they are rendered (loading, images, custom components)
  useEffect(() => {
    const content = contentRef.current;
    if (!content) {
      return undefined;
    }

    let observer: MutationObserver | undefined;
    if (typeof MutationObserver !== 'undefined') {
      observer = new MutationObserver(() => {
        if (stickToBottomRef.current) {
          scrollToBottom();
        }
      });
      observer.observe(content, { childList: true, subtree: true });
    }

    const onResize = () => {
      if (stickToBottomRef.current) {
        content.scrollTop = content.scrollHeight;
      }
    };
    window.addEventListener('resize', onResize);

    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, [contentRef, scrollToBottom]);

  useEffect(() => {
    if (messagesCount > messagesCountRef.current) {
      stickToBottomRef.current = true;
      scrollToBottom();
    }
    messagesCountRef.current = messagesCount;
  }, [messagesCount, scrollToBottom]);

  return useCallback(() => {
    const content = contentRef.current;
    if (!content) {
      return;
    }

    const distance = content.scrollHeight - content.scrollTop - content.clientHeight;
    if (distance <= BOTTOM_THRESHOLD) {
      stickToBottomRef.current = true;
    } else if (distance > distanceToBottomRef.current) {
      // moving away from the bottom, so it was the user (smooth scroll only goes down)
      stickToBottomRef.current = false;
    }
    distanceToBottomRef.current = distance;
  }, [contentRef]);
};

export default useAutoScroll;
