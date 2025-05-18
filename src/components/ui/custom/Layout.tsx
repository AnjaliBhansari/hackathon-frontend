import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { KudosModal } from "@/components/KudosModal";
import { useRouter } from "next/router";

interface LayoutProps {
  children: React.ReactNode;
  user: any;
}

const Layout: React.FC<LayoutProps> = ({ children, user }) => {
  const [kudosOpen, setKudosOpen] = useState(false);
  const router = useRouter();

  const handleKudosCreated = () => {
    // Refresh the current page to show the new kudos
    router.reload();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} onGiveKudos={() => setKudosOpen(true)} />
      <KudosModal 
        open={kudosOpen} 
        setOpen={setKudosOpen} 
        onKudosCreated={handleKudosCreated}
      />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
