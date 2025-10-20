import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router"; // ✅ use react-router-dom
import router from "./Routes/index";
import { ThemeProvider } from "./components/Providers/ThemeProvider";
import { Provider } from "react-redux";
import { store } from "./components/Redux/store";
import { Toaster } from "sonner";
import loaderJson from "./assets/lottie/Forklift loading truck.json";
import LottieLoader from "./shared/lotttieAnimation";
import { DelayedSuspense } from "./shared/DelayedSuspense";
// import SocketManager from "./components/Hooks/ScocketManager";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="system">
        <Toaster theme="system" richColors />
        {/* <SocketManager /> */}
        {/* Suspense wrapper */}
        {/* <DelayedSuspense
          delay={2000}
          fallback={
            <LottieLoader
              animationData={loaderJson}
              size={150}
              ariaLabel="Loading app..."
            />
          }
        > */}
        <Suspense
          fallback={
            <LottieLoader
              animationData={loaderJson}
              size={150}
              ariaLabel="Loading app..."
            />
          }
        >
          <RouterProvider router={router} />
        </Suspense>
        {/* </DelayedSuspense> */}
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
