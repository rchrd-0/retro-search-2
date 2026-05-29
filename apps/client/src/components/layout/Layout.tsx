import { Toaster } from "@/components/ui/sonner";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-border/60 border-b bg-card/50 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-4">
          <div className="flex h-7 w-7 items-center justify-center rounded border border-primary/40 bg-primary/10">
            <span className="font-bold font-mono text-primary text-xs">RS</span>
          </div>
          <span className="font-mono font-semibold text-foreground/80 text-sm uppercase tracking-widest">
            Retro Search
          </span>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8">
        {children}
        <Toaster />
      </main>
    </div>
  );
};

export default Layout;
