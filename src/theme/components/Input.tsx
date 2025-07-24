import { cva } from "class-variance-authority";
import * as React from "react";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full px-3 text-sm h-[54px] rounded-[5px]",
  {
    variants: {
      variant: {
        default: "",
        primary:
          "border-[1px] border-[solid] border-[#DDDDDD]",
        error: "border-[1px] border-[solid] border-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(inputVariants({ variant }), className)}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
