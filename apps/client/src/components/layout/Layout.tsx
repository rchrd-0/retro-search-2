import { Toaster } from "@/components/ui/sonner";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-8">
      {children}
      <Toaster />
    </main>
  );
};

export default Layout;
