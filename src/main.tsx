import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router"; // If using react-router-dom v6+
import router from "./Routes/index"; // Adjust import (no file extension)
import { ThemeProvider } from "./components/Providers/ThemeProvider";
import { Provider } from "react-redux";
import { store } from "./components/Redux/store";
import { Toaster } from "sonner";
import Loader from "./components/ui/Loader";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="system">
        <Toaster theme="system" richColors />
        <Suspense fallback={<Loader />}>
         
          
        </Suspense>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
