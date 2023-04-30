import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary" | "danger";
}

export default function Button({ variant, children, ...props }: ButtonProps) {
  const baseStyle = clsx("py-2 px-4 rounded shadow-sm");
  const defaultStyle = clsx("bg-white border border-gray-200");
  const primaryStyle = clsx("bg-sky-500");
  const secondaryStyle = clsx("bg-gray-100 border border-gray-200");

  function applyVariant() {
    switch (variant) {
      case "primary":
        return primaryStyle;
      case "secondary":
        return secondaryStyle;
      default:
        return defaultStyle;
    }
  }

  return (
    <button className={`${baseStyle} ${applyVariant()}`} {...props}>
      {children}
    </button>
  );
}
