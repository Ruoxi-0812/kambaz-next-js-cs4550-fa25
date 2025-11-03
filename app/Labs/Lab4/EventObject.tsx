'use client';

import { useState } from 'react';

const makeSafeReplacer = () => {
  const seen = new WeakSet<object>();
  return (_key: string, value: unknown) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value as object)) return '[Circular]';
      seen.add(value as object);
    }
    if (typeof HTMLElement !== 'undefined' && value instanceof HTMLElement) {
      return value.outerHTML;
    }
    if (typeof Window !== 'undefined' && value instanceof Window) {
      return '[Window]';
    }
    if (
      value &&
      typeof value === 'object' &&
      (value as { stateNode?: unknown; return?: unknown }).stateNode &&
      (value as { stateNode?: unknown; return?: unknown }).return
    ) {
      return '[FiberNode]';
    }
    if (typeof value === 'function') return undefined;
    return value;
  };
};

export default function EventObject() {
  const [event, setEvent] = useState<Record<string, unknown> | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const clone: Record<string, unknown> = {
      ...(e as unknown as Record<string, unknown>),
    };
    clone.target = (e.target as HTMLElement).outerHTML;
    delete clone.view;
    setEvent(clone);
  };

  return (
    <div>
      <h2>Event Object</h2>
      <button
        onClick={handleClick}
        className="btn btn-primary"
        id="wd-display-event-obj-click"
      >
        Display Event Object
      </button>

      <pre>{JSON.stringify(event, makeSafeReplacer(), 2)}</pre>
      <hr />
    </div>
  );
}
