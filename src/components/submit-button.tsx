"use client";

import { useFormStatus } from "react-dom";
import { ComponentProps } from "react";
import { Button } from "./ui/button";

export const SubmitButton = (props: ComponentProps<typeof Button>) => {
  const { pending } = useFormStatus();
  return (
    <Button {...props} disabled={props.disabled || pending}>
      {pending ? (
        <span className="flex items-center gap-2">
          <span className="loader h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          {props.children}
        </span>
      ) : (
        props.children
      )}
    </Button>
  );
};
