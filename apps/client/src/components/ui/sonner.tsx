import {
  CircleCheckIcon,
  CircleXIcon,
  InfoIcon,
  Loader2Icon,
  TriangleAlertIcon,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      position="bottom-right"
      visibleToasts={3}
      gap={8}
      icons={{
        success: <CircleCheckIcon className="size-4" style={{ color: "var(--primary)" }} />,
        info: <InfoIcon className="size-4" style={{ color: "oklch(0.65 0.18 220)" }} />,
        warning: <TriangleAlertIcon className="size-4" style={{ color: "oklch(0.78 0.18 75)" }} />,
        error: <CircleXIcon className="size-4" style={{ color: "var(--destructive)" }} />,
        loading: (
          <Loader2Icon
            className="size-4 animate-spin"
            style={{ color: "var(--muted-foreground)" }}
          />
        ),
      }}
      toastOptions={{
        style: {
          fontFamily: "var(--font-mono)",
          fontSize: "13px",
        },
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--success-bg": "oklch(0.14 0.04 162)",
          "--success-border": "oklch(0.72 0.17 162 / 28%)",
          "--success-text": "oklch(0.88 0.07 162)",
          "--error-bg": "oklch(0.14 0.04 27)",
          "--error-border": "oklch(0.65 0.22 27 / 28%)",
          "--error-text": "oklch(0.88 0.07 27)",
          "--warning-bg": "oklch(0.14 0.04 75)",
          "--warning-border": "oklch(0.78 0.18 75 / 28%)",
          "--warning-text": "oklch(0.88 0.07 75)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
