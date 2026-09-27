import { useCallback, useEffect, useRef, type RefObject } from 'react';

// distance (px) to the bottom still considered the bottom
const BOTTOM_THRESHOLD = 40;
// the time a smooth scroll takes to reach the bottom
const SMOOTH_SCROLL_DURATION = 500;

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
  const scrollTopRef = useRef(0);
  const settleTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
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
      // browsers can stop a smooth scroll early when it is requested many times
      // in a row, so make sure it ends at the bottom
      clearTimeout(settleTimeoutRef.current);
      settleTimeoutRef.current = setTimeout(() => {
        if (stickToBottomRef.current) {
          content.scrollTop = content.scrollHeight;
          scrollTopRef.current = content.scrollTop;
        }
      }, SMOOTH_SCROLL_DURATION);
    } else {
      content.scrollTop = content.scrollHeight;
      scrollTopRef.current = content.scrollTop;
    }
  }, [contentRef, enableSmoothScroll]);

  // the messages grow after they are rendered (loading, images, custom components)
  useEffect(() => {
    const content = contentRef.current;
    if (!content) {
      return undefined;
    }

    const follow = () => {
      if (stickToBottomRef.current) {
        scrollToBottom();
      }
    };

    // a message can also grow without a DOM change (fonts, images, wrapping),
    // and some browsers cancel a smooth scroll when the content changes size
    let resizeObserver: ResizeObserver | undefined;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(follow);
    }
    const observeMessages = () => {
      Array.from(content.children).forEach(child => resizeObserver?.observe(child));
    };
    observeMessages();

    let observer: MutationObserver | undefined;
    if (typeof MutationObserver !== 'undefined') {
      observer = new MutationObserver(() => {
        observeMessages();
        follow();
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
      resizeObserver?.disconnect();
      clearTimeout(settleTimeoutRef.current);
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

    const { scrollTop } = content;
    const distance = content.scrollHeight - scrollTop - content.clientHeight;
    if (distance <= BOTTOM_THRESHOLD) {
      stickToBottomRef.current = true;
    } else if (scrollTop < scrollTopRef.current) {
      // scrolling up, so it was the user (following the messages only scrolls down,
      // while new content moves the bottom away without scrolling)
      stickToBottomRef.current = false;
    }
    scrollTopRef.current = scrollTop;
  }, [contentRef]);
};

export default useAutoScroll;
