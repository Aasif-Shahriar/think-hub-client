import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./router/router";
import { RouterProvider } from "react-router";
import AuthProvider from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "swiper/css";

import AOS from "aos";
import "aos/dist/aos.css";
import ThemeProvider from "./context/theme-context/ThemeProvider";

const queryClient = new QueryClient();

AOS.init({
  duration: 800,
  easing: "ease-in-out",
  offset: 120,
  delay: 0,
  once: true,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Toaster position="top-center" />
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
