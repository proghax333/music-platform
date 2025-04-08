import { useSession } from "./useSession";

export function WaitForSessionLoading({ children }) {
  const { isLoading } = useSession();

  return isLoading ? null : children;
}
