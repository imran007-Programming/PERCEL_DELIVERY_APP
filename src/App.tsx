import { Outlet } from "react-router";
import CommonLayouts from "./components/ui/Layouts/CommonLayouts";

function App() {
  return (
    <CommonLayouts>
      <Outlet />
    </CommonLayouts>
  );
}

export default App;
