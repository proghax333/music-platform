import { BrowserRouter, Route, Routes } from "react-router";

import Index from "@/pages/index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function RootRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Index />} />
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
