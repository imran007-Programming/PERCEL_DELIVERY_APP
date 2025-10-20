import { type ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";


type IProps = {
  children: ReactNode;
};

export default function CommonLayouts({ children }: IProps) {
  return (
    <div className="flex flex-col min-h-screen">
       
      <Navbar />
      <div className="flex-grow ">{children}</div>

      <Footer />
    </div>
  );
}
