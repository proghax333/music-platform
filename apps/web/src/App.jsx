import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Index from "@/pages/index";
import Login from "@/pages/login";

import AccountSettings from "@/pages/settings/account";
import AddressesSettings from "@/pages/settings/addresses";
import ActivitySettings from "@/pages/settings/activity";
import PrivacySettings from "@/pages/settings/privacy";
import SecuritySettings from "@/pages/settings/security";
import LogoutSettings from "@/pages/settings/logout";

function RootRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Index />} />
          <Route path="login" element={<Login />} />

          <Route path="settings/account" element={<AccountSettings />} />
          <Route path="settings/addresses" element={<AddressesSettings />} />
          <Route path="settings/activity" element={<ActivitySettings />} />
          <Route path="settings/privacy" element={<PrivacySettings />} />
          <Route path="settings/security" element={<SecuritySettings />} />
          <Route path="settings/logout" element={<LogoutSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// Client for react-query
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootRouter />
    </QueryClientProvider>
  );
}

export default App;
