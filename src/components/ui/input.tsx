import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={cn(
      "flex h-11 w-full rounded-xl border border-linen bg-cream px-4 text-sm text-forest-deep placeholder:text-sage focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
      className,
    )}
    ref={ref}
    {...props}
  />
));
Input.displayName = "Input";
