import { Outlet, useLocation } from "react-router";
import CommonLayouts from "./components/ui/Layouts/CommonLayouts";
import { useEffect } from "react";

function App() {
   const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
   

  //  useEffect(() => {
  //   const handleRightClick = (e:MouseEvent) => {
  //     e.preventDefault();
  //   };

  //   // Attach the event listener to the document
  //   document.addEventListener('contextmenu', handleRightClick);

  //   // Cleanup the event listener when the component unmounts
  //   return () => {
  //     document.removeEventListener('contextmenu', handleRightClick);
  //   };
  // }, []);
 
  return (
    <CommonLayouts>
      
      <Outlet />
    </CommonLayouts>
  );
}

export default App;
