import React, {useState, type ReactNode} from 'react';

export default function HighlightBox({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}): ReactNode {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => setOpen(!open)}
      style={{
        border: '2px solid var(--ifm-color-primary)',
        borderRadius: '10px',
        padding: '1rem',
        margin: '1rem 0',
        background: 'var(--ifm-background-surface-color)',
        cursor: 'pointer',
      }}>
      <div style={{fontWeight: 700}}>
        {open ? '▼' : '▶'} {title}
      </div>
      {open && <div style={{marginTop: '0.75rem'}}>{children}</div>}
    </div>
  );
}
