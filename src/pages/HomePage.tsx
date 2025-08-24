import CourierCharge from "@/components/Modules/CourierCharege";
import HeroSection from "@/components/Modules/HeroSection";
import HeroSection1 from "@/components/Modules/HeroSection1";
import OurFacelities from "@/components/Modules/OurFacelities";


export default function HomePage() {
 
  return (
    <div className=" space-y-20">
     <div className="sm:mt-0 mt-30">
       <HeroSection/>
     </div>
     <div>
      <OurFacelities/>
     </div>
     <div>

      <HeroSection1/>
     </div>
     <div>
      <CourierCharge/>
     </div>
    </div>
  );
}