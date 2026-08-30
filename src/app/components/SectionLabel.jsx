// Editorial eyebrow label: { About }
const SectionLabel = ({ children, className = "" }) => (
  <p
    className={`flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted ${className}`}>
    <span className="font-display text-accent">{"{"}</span>
    <span>{children}</span>
    <span className="font-display text-accent">{"}"}</span>
  </p>
);

export default SectionLabel;
