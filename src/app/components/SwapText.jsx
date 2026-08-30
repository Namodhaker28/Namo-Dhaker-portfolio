// Text-swap hover: two stacked copies of the label inside an overflow-hidden
// mask. When a parent with the `swap-parent` class is hovered, the column
// slides up one line, revealing the duplicate (see globals.css).
const SwapText = ({ children, className = "" }) => (
  <span className={`swap ${className}`}>
    <span className="swap-inner">
      <span className="block">{children}</span>
      <span className="block" aria-hidden="true">
        {children}
      </span>
    </span>
  </span>
);

export default SwapText;
