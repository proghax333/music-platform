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
import Settings from "@/pages/settings";
import LessonsPage from "@/pages/lessons";
import Shop from "@/pages/shop/shop";
import ShopDescription from "@/pages/shop/shop-description";
import Nav from "@/components/Nav";
import Cart from "./pages/cart/Cart";
import ProfilePage from "./pages/Profile/ProfilePage";
import Payment from "./pages/Payment_Page/Payment";
import Task from "./pages/Task/Task";
import TaskDes from "./pages/Task/Taskdes";
function RootRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Index />} />
          <Route path="login" element={<Login />} />

          <Route path="settings">
            <Route index element={<Settings />} />
            <Route path="account" element={<AccountSettings />} />
            <Route path="addresses" element={<AddressesSettings />} />
            <Route path="activity" element={<ActivitySettings />} />
            <Route path="privacy" element={<PrivacySettings />} />
            <Route path="security" element={<SecuritySettings />} />
            <Route path="logout" element={<LogoutSettings />} />
          </Route>
          <Route path="Profile" element={<ProfilePage />}></Route>

          <Route path="task">
            <Route index element={<Task />} />
            <Route path=":id" element={<TaskDes />} />
          </Route>
          <Route path="shop">
            <Route index element={<Shop />} />
            <Route path=":id" element={<ShopDescription />} />
          </Route>
          <Route path="payment" element={<Payment />} />

          <Route path="nav" element={<Nav />} />
          <Route path="cart" element={<Cart />} />
          <Route path="lessons">
            <Route index element={<LessonsPage />} />
          </Route>
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
