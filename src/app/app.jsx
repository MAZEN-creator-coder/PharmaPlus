import React, { useState } from "react";
import RoutesComponent from "./routes";  // Import the Routes component
import Providers from "./providers";    // Import the Providers component
import LoginModal from "../pages/homepage/components/LoginModal.jsx";

export default function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  return (
    <Providers>
      <RoutesComponent onOpenLogin={openLogin} />
      <LoginModal isOpen={isLoginOpen} onClose={closeLogin} />
    </Providers>
  );
}
