import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router"; // ✅ use react-router-dom
import router from "./Routes/index";
import { ThemeProvider } from "./components/Providers/ThemeProvider";
import { Provider } from "react-redux";
import { store } from "./components/Redux/store";
import { Toaster } from "sonner";
import Loader from "./components/ui/Loader";
// import Loader from "./components/ui/Loader";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="system">
        <Toaster theme="system" richColors />

        {/* Suspense wrapper */}
        <Suspense fallback={<Loader />}>
          <RouterProvider router={router} />
        </Suspense>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
