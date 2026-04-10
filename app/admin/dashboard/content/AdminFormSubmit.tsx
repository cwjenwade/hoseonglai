"use client";

import { useActionState } from "react";

type AdminFormSubmitProps = {
  label: string;
  onValidate?: () => string | null;
};

export default function AdminFormSubmit({ label, onValidate }: AdminFormSubmitProps) {
  const [, , isPending] = useActionState(async () => {}, null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;

    if (onValidate) {
      const error = onValidate();
      if (error) {
        e.preventDefault();
        alert(error);
        return;
      }
    }

    const button = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    if (button) {
      button.disabled = true;
      button.textContent = "儲存中...";
    }
  };

  return {
    handleSubmit,
    isPending,
  };
}
