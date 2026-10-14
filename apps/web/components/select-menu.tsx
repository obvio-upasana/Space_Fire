"use client";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "./ui";
export function SelectMenu<T extends string>({
  value,
  onChange,
  options,
  label,
}: {
  value: T;
  onChange: (value: T) => void;
  options: readonly { value: T; label: string }[];
  label: string;
}) {
  const id = useId(),
    trigger = useRef<HTMLButtonElement>(null),
    menu = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false),
    [active, setActive] = useState(0);
  const [position, setPosition] = useState({ left: 0, top: 0, width: 220 });
  function show() {
    const bounds = trigger.current?.getBoundingClientRect();
    if (!bounds) return;
    const width = Math.max(bounds.width, 220),
      height = options.length * 40 + 16;
    setPosition({
      left: Math.max(8, Math.min(bounds.left, window.innerWidth - width - 8)),
      top:
        bounds.bottom + height > window.innerHeight - 8
          ? Math.max(8, bounds.top - height - 6)
          : bounds.bottom + 6,
      width: Math.min(width, window.innerWidth - 16),
    });
    setActive(
      Math.max(
        0,
        options.findIndex((option) => option.value === value),
      ),
    );
    setOpen(true);
  }
  function choose(index: number) {
    const option = options[index];
    if (option) {
      onChange(option.value);
      setOpen(false);
      trigger.current?.focus();
    }
  }
  useEffect(() => {
    if (!open) return;
    menu.current?.focus();
    const outside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !menu.current?.contains(event.target) &&
        !trigger.current?.contains(event.target)
      )
        setOpen(false);
    };
    const close = () => setOpen(false);
    const scroll = (event: Event) => {
      if (event.target instanceof Node && menu.current?.contains(event.target))
        return;
      close();
    };
    document.addEventListener("pointerdown", outside);
    window.addEventListener("resize", close);
    window.addEventListener("scroll", scroll, true);
    return () => {
      document.removeEventListener("pointerdown", outside);
      window.removeEventListener("resize", close);
      window.removeEventListener("scroll", scroll, true);
    };
  }, [open]);
  return (
    <>
      <button
        ref={trigger}
        type="button"
        className="select-trigger"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            show();
          }
        }}
      >
        <span>{options.find((option) => option.value === value)?.label}</span>
        <Icon name="chevron" size={12} />
      </button>
      {open &&
        createPortal(
          <div
            ref={menu}
            id={id}
            className="select-popup"
            role="listbox"
            aria-label={label}
            tabIndex={-1}
            aria-activedescendant={id + "-" + active}
            style={position}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                event.preventDefault();
                setActive(
                  (index) =>
                    (index +
                      (event.key === "ArrowDown" ? 1 : options.length - 1)) %
                    options.length,
                );
              }
              if (event.key === "Home") {
                event.preventDefault();
                setActive(0);
              }
              if (event.key === "End") {
                event.preventDefault();
                setActive(options.length - 1);
              }
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                choose(active);
              }
              if (event.key === "Escape") {
                event.preventDefault();
                event.stopPropagation();
                setOpen(false);
                trigger.current?.focus();
              }
              if (event.key === "Tab") setOpen(false);
            }}
          >
            {options.map((option, index) => (
              <div
                key={option.value}
                id={id + "-" + index}
                role="option"
                aria-selected={value === option.value}
                className={
                  index === active ? "select-option focused" : "select-option"
                }
                onPointerMove={() => setActive(index)}
                onClick={() => choose(index)}
              >
                <span>{option.label}</span>
                {value === option.value && <Icon name="check" size={13} />}
              </div>
            ))}
          </div>,
          document.body,
        )}
    </>
  );
}
