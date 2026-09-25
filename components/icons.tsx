export function Logo({ className = "" }: { className?: string }) {
  return <img className={`logo ${className}`} src="/brand/baia-logo.png" alt="Baía" />;
}

export function Diamond() {
  return <i className="diamond" aria-hidden="true" />;
}

export function Floral() {
  return <img className="floral" src="/shapes/s-shape-1.png?v=3" alt="" />;
}

export function PlayMark() {
  return (
    <span className="play-mark" aria-hidden="true">
      <svg viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="46" fill="none" stroke="currentColor" strokeWidth="1" />
        <path
          d="M60 14c8 6 10 12 8 18-6-2-10-8-8-18zm32 14c2 10-2 14-8 16 2-8 0-14 8-16zM106 60c-6 8-12 8-18 6 6-2 10-8 18-6zM92 92c-10 2-14-2-16-8 8 0 14 2 16 8zM60 106c-8-6-8-12-6-18 2 8 8 12 6 18zM28 92c-2-10 2-14 8-16-2 8 0 14-8 16zM14 60c6-8 12-8 18-6-6 2-10 8-18 6zM28 28c10-2 14 2 16 8-8 0-14-2-16-8z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path d="M52 44 L80 60 L52 76 Z" fill="currentColor" />
      </svg>
    </span>
  );
}
