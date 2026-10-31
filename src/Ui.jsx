import { useEffect, useId, useRef } from "react";
export function Brand() {
  return <span className="brand" role="img" aria-label="Amazon" />;
}
export function Icon({ name, size = 20, ...props }) {
  const paths = {
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="7" />
        <path d="m16 16 5 5" />
      </>
    ),
    menu: <path d="M2 5h20M2 12h20M2 19h20" />,
    pin: (
      <>
        <path d="M12 22s8-8.5 8-14a8 8 0 1 0-16 0c0 5.5 8 14 8 14Z" />
        <circle cx="12" cy="8" r="2.5" />
      </>
    ),
    cart: (
      <>
        <path d="M1 2h4l3 14h12l3-10H6" />
        <circle cx="10" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
      </>
    ),
    close: <path d="m5 5 14 14M19 5 5 19" />,
    chevron: <path d="m9 4 8 8-8 8" />,
    check: <path d="m4 12 5 5L20 6" />,
    globe: (
      <>
        <circle cx="12" cy="12" r="10" />
        <ellipse cx="12" cy="12" rx="4" ry="10" />
        <path d="M2 12h20" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      {...props}
    >
      {paths[name] || paths.chevron}
    </svg>
  );
}
export function Price({ value, className = "" }) {
  const [whole, cents] = value.toFixed(2).split(".");
  return (
    <span className={`price ${className}`} aria-label={`$${value.toFixed(2)}`}>
      <sup>$</sup>
      {whole}
      <sup>{cents}</sup>
    </span>
  );
}
export function Modal({ title, children, onClose, className = "" }) {
  const dialog = useRef(null);
  const titleId = useId();
  useEffect(() => {
    const element = dialog.current;
    element.showModal();
    return () => element.close();
  }, []);
  return (
    <dialog
      ref={dialog}
      className={`modal ${className}`}
      aria-labelledby={titleId}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="modal-heading">
        <h2 id={titleId}>{title}</h2>
        <button
          className="icon-button"
          aria-label="Close dialog"
          onClick={onClose}
        >
          <Icon name="close" />
        </button>
      </div>
      <div className="modal-content">{children}</div>
    </dialog>
  );
}
