import MainNav from "@/components/main-nav";
import React from "react";
import { useSession } from "../session/useSession";

function HomePage() {
  const { isLoggedIn, user, getCurrentProfile } = useSession();

  return (
    <>
      <MainNav />
    </>
  );
}

export default HomePage;
