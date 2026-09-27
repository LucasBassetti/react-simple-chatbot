import { lazy, Suspense, type ComponentType } from 'react';
import { createPortal } from 'react-dom';

const modules = import.meta.glob<{ default: ComponentType }>('../examples/*.tsx');

const examples: Record<string, ReturnType<typeof lazy>> = Object.fromEntries(
  Object.entries(modules).map(([path, load]) => [
    path.replace('../examples/', '').replace('.tsx', ''),
    lazy(load)
  ])
);

interface Props {
  name: string;
  /** render in document.body, for fixed elements like the floating chatbot */
  portal?: boolean;
}

/** Renders a live example from src/examples, loaded on demand */
export default function ExampleRenderer({ name, portal = false }: Props) {
  const Example = examples[name];

  if (!Example) {
    return <p>Unknown example: {name}</p>;
  }

  if (portal) {
    // the content of the docs page is an isolated stacking context, so a fixed
    // element inside it would be covered by the sidebars
    return createPortal(
      <Suspense fallback={null}>
        <Example />
      </Suspense>,
      document.body
    );
  }

  return (
    <Suspense fallback={<div className="demo-loading" aria-hidden="true" />}>
      <Example />
    </Suspense>
  );
}
