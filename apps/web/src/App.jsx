import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "@/lib/react-query";

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
import LessonViewPage from "@/pages/lessons/lesson-view";
import HomePage from "@/pages/index";
import EventsPage from "@/pages/events";
import PracticePage from "@/pages/practice";
import AboutPage from "@/pages/about";
import EventInfoPage from "@/pages/events/event-info";

import DashboardLayout from "@/modules/dashboard/dashboard-layout";
import ProductsView from "./modules/dashboard/products/products-view";
import AudioRecorder from "./pages/Record/AudioRecorder";
import Checkout from "./pages/Cart/Checkout";
import { SessionProvider } from "./modules/session/SessionProvider";
import { WaitForSessionLoading } from "./modules/session/WaitForSessionLoading";

function RootRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
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
          <Route path="profile" element={<ProfilePage />}></Route>
          <Route path="eventsinfo" element={<EventInfoPage />}></Route>

          <Route path="task">
            <Route index element={<Task />} />
            <Route path=":id" element={<TaskDes />} />
          </Route>
          <Route path="shop">
            <Route index element={<Shop />} />
            <Route path=":id" element={<ShopDescription />} />
          </Route>
          <Route path="checkout" element={<Checkout />} />

          <Route path="payment" element={<Payment />} />
          <Route path="nav" element={<Nav />} />
          <Route path="cart" element={<Cart />} />
          <Route path="lessons">
            <Route index element={<LessonsPage />} />
            <Route path=":id" element={<LessonViewPage />} />
          </Route>

          <Route path="events">
            <Route index element={<EventsPage />} />
            <Route path=":id" element={<EventInfoPage />} />
          </Route>

          <Route path="rec" element={<AudioRecorder />} />
          <Route path="about">
            <Route index element={<AboutPage />} />
          </Route>

          <Route path="practice">
            <Route index element={<PracticePage />} />
          </Route>

          <Route path="dashboard" element={<DashboardLayout />}>
            <Route path="products">
              <Route index element={<ProductsView />} />
              <Route path=":id" element={null} />
              <Route path=":id/edit" element={null} />
              <Route path=":id/delete" element={null} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <WaitForSessionLoading>
          <RootRouter />
        </WaitForSessionLoading>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default App;
