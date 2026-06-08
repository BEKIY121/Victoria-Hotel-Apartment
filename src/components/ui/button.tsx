import { cn } from "@/lib/utils";
import Link from "next/link";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "light";
  size?: "sm" | "md" | "lg";
  href?: string;
  children: ReactNode;
}

const variants = {
  primary:
    "bg-charcoal hover:bg-charcoal-light text-white tracking-wide uppercase text-xs font-semibold",
  secondary:
    "bg-bronze hover:bg-bronze-dark text-white tracking-wide uppercase text-xs font-semibold",
  outline:
    "border border-charcoal text-charcoal hover:bg-charcoal hover:text-white tracking-wide uppercase text-xs font-semibold",
  ghost: "text-charcoal hover:text-bronze tracking-wide uppercase text-xs font-semibold",
  light:
    "border border-white/60 text-white hover:bg-white hover:text-charcoal tracking-wide uppercase text-xs font-semibold",
};

const sizes = {
  sm: "px-5 py-2.5",
  md: "px-7 py-3",
  lg: "px-9 py-4 text-sm",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
