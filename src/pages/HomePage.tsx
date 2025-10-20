import CourierCharge from "@/components/Modules/Public/CourierCharege";
import HeroSection from "@/components/Modules/Public/HeroSection";
import OurFacelities from "@/components/Modules/Public/OurFacelities";
import ScrollToTopProgress from "@/components/ui/scrollToTop";
import HereWithUs from "@/components/Modules/Public/HereWithUs";
import OurAchievement from "@/components/Modules/Public/OurAchievement";
import { OurPartner } from "@/components/Modules/Public/OurPartner";
import UserChat from "@/components/Modules/liveChat/UserChat";


export default function HomePage() {
 
  return (
    <div className=" space-y-20">
     <div className="sm:mt-0 ">
       <HeroSection/>
     </div>
     <div>
      <OurFacelities/>
     </div>
     <div>

      <HereWithUs/>
     </div>
     <div>
      <CourierCharge/>
      <ScrollToTopProgress/>
      <UserChat/>
     </div>
     <div>
    <OurAchievement/>
     </div>
     <div>
    <OurPartner/>
     </div>
    </div>
  );
}