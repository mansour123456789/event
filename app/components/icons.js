const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function IconMic(props) {
  return (
    <svg {...base} {...props}>
      <rect x="9" y="2" width="6" height="11" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0M12 17v5M8 22h8" />
    </svg>
  );
}

export function IconCase(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 4h12l4 4v12H4z" />
      <path d="M16 4v4h4M8 12h8M8 16h5" />
    </svg>
  );
}

export function IconExpo(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3 21h18M5 21V8l7-5 7 5v13" />
      <path d="M9 21v-6h6v6" />
    </svg>
  );
}

export function IconNetwork(props) {
  return (
    <svg {...base} {...props}>
      <path d="M8.5 13.5 5 17a2.8 2.8 0 0 0 4 4l1.5-1.5" />
      <path d="M15.5 10.5 19 7a2.8 2.8 0 0 0-4-4l-1.5 1.5" />
      <path d="M9.5 14.5 14.5 9.5" />
    </svg>
  );
}

export function IconRoute(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="6" cy="19" r="2.5" />
      <circle cx="18" cy="5" r="2.5" />
      <path d="M8.5 19h4.5a4 4 0 0 0 0-8h-2a4 4 0 0 1 0-8h4.5" />
    </svg>
  );
}

export function IconShield(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 20 6v6c0 4.5-3.3 8.3-8 9-4.7-.7-8-4.5-8-9V6z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function IconUsers(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16.5 5.2a3.2 3.2 0 0 1 0 5.9M18 20a6.5 6.5 0 0 0-2.2-4.9" />
    </svg>
  );
}

export function IconLayers(props) {
  return (
    <svg {...base} {...props}>
      <path d="m12 3 9 5-9 5-9-5z" />
      <path d="m3 13 9 5 9-5M3 17l9 5 9-5" />
    </svg>
  );
}

export function IconCalendar(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

export function IconPin(props) {
  return (
    <svg {...base} {...props}>
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function IconArrow(props) {
  return (
    <svg {...base} width={16} height={16} {...props}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

/* ------------------------------------------------- commandes vidéo --- */

export function IconPlay(props) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" {...props}>
      <path d="M8 5.2a1 1 0 0 1 1.5-.87l9 6.8a1 1 0 0 1 0 1.74l-9 6.8A1 1 0 0 1 8 18.8z" />
    </svg>
  );
}

export function IconPause(props) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" {...props}>
      <rect x="6.5" y="5" width="4" height="14" rx="1.2" />
      <rect x="13.5" y="5" width="4" height="14" rx="1.2" />
    </svg>
  );
}

export function IconSound(props) {
  return (
    <svg {...base} width={18} height={18} {...props}>
      <path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z" />
      <path d="M15.6 9.2a4 4 0 0 1 0 5.6M18.2 6.6a7.6 7.6 0 0 1 0 10.8" />
    </svg>
  );
}

export function IconMute(props) {
  return (
    <svg {...base} width={18} height={18} {...props}>
      <path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z" />
      <path d="m16.5 9.8 4.5 4.4M21 9.8l-4.5 4.4" />
    </svg>
  );
}
