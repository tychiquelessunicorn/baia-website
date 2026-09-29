export function Logo({ className = "" }: { className?: string }) {
  return <img className={`logo ${className}`} src="/brand/baia-logo.png?v=4" alt="Baía Seafood Restaurant" />;
}

export function Diamond() {
  return <i className="diamond" aria-hidden="true" />;
}

export function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.8 8.4h2.3V5.4h-2.3c-2.5 0-4.1 1.6-4.1 4.2v1.9H8.2V15h2.5v6.6h3.2V15h2.4l.4-3.5h-2.8V9.7c0-.8.3-1.3 1.3-1.3z"
      />
    </svg>
  );
}

export function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 3h3l1.4 3.4-2 1.2a12 12 0 0 0 6 6l1.2-2L21 13v3a2 2 0 0 1-2.2 2A17 17 0 0 1 6 6.2 2 2 0 0 1 8 3z"
      />
    </svg>
  );
}

export function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4.5 7.2 12 12.4l7.5-5.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 7.6a4.4 4.4 0 1 0 0 8.8 4.4 4.4 0 0 0 0-8.8zm0 7.2a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6zM17.2 7.1a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM12 4.4c1.5 0 1.6 0 2.2.1.5 0 .9.1 1.2.2.4.2.6.3.9.6.2.2.4.5.6.9.1.3.2.7.2 1.2.1.6.1.7.1 2.2s0 1.6-.1 2.2c0 .5-.1.9-.2 1.2-.2.4-.4.6-.6.9-.3.2-.5.4-.9.6-.3.1-.7.2-1.2.2-.6.1-.7.1-2.2.1s-1.6 0-2.2-.1c-.5 0-.9-.1-1.2-.2-.4-.2-.6-.4-.9-.6-.2-.3-.4-.5-.6-.9-.1-.3-.2-.7-.2-1.2-.1-.6-.1-.7-.1-2.2s0-1.6.1-2.2c0-.5.1-.9.2-1.2.2-.4.4-.7.6-.9.3-.3.5-.4.9-.6.3-.1.7-.2 1.2-.2.6-.1.7-.1 2.2-.1zm0-1.6c-1.5 0-1.7 0-2.3.1-.6 0-1.1.1-1.5.3-.4.1-.8.4-1.1.7-.3.3-.6.7-.7 1.1-.2.4-.3.9-.3 1.5C6 7.1 6 7.3 6 8.8v2.4c0 1.5 0 1.7.1 2.3.1.6.1 1.1.3 1.5.1.4.4.8.7 1.1.3.3.7.6 1.1.7.4.2.9.3 1.5.3.6.1.8.1 2.3.1h2.4c1.5 0 1.7 0 2.3-.1.6 0 1.1-.1 1.5-.3.4-.1.8-.4 1.1-.7.3-.3.6-.7.7-1.1.2-.4.3-.9.3-1.5.1-.6.1-.8.1-2.3V8.8c0-1.5 0-1.7-.1-2.3 0-.6-.1-1.1-.3-1.5-.1-.4-.4-.8-.7-1.1-.3-.3-.7-.6-1.1-.7-.4-.2-.9-.3-1.5-.3-.6-.1-.8-.1-2.3-.1H12z"
      />
    </svg>
  );
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
