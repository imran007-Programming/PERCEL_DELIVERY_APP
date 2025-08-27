import { Outlet, useLocation } from "react-router";
import CommonLayouts from "./components/ui/Layouts/CommonLayouts";
import { useEffect } from "react";

function App() {
   const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

 
  return (
    <CommonLayouts>
      
      <Outlet />
    </CommonLayouts>
  );
}

export default App;
