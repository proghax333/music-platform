import { useSession } from "@/modules/session/useSession";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function Logout() {
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    async function logout() {
      if (session.isLoggedIn) {
        await session.logout();
        navigate("/login");
      }
    }

    logout();
  }, []);
}

export default Logout;
