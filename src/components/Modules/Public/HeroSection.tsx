import { ArrowRight, Crosshair } from "lucide-react";

import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { ReactLenis } from "lenis/react";
import img1 from "../../../assets/website all images/1.png";
import img2 from "../../../assets/website all images/2.png";
import img3 from "../../../assets/website all images/3.png";
import ButtonHoverTopFlip from "@/shared/AnimatedButton";
import { Button } from "@/components/ui/button";
export default function HeroSection() {
  const [trackingId, setTrackingId] = useState("");
  const navigate = useNavigate();

  // Create a reference to the input section
  const inputRef = useRef<HTMLDivElement>(null);

  const handleRedirect = () => {
    if (trackingId) {
      navigate(`/track/${trackingId}`);
    } else {
      navigate("/track");
    }
  };

  // Scroll to the input field when the button is clicked
  const scrollToInput = () => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <ReactLenis root>
      <main>
        <article>
          {/* 1️⃣ Section 1 */}
          {/* 1️⃣ Section 1 */}
          <section className=" bg-gray-300 dark:bg-[#101828]  h-[450px] sm:h-screen w-full sticky top-0 overflow-hidden">
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-10"></div>

            {/* Background image */}
            <img
              src={img1}
              alt=""
              className="absolute  inset-0 w-auto h-full sm:w-full object-fill sm:object-center"
            />
          </section>

          {/* 2️⃣ Section 2 */}
          <section className="bg-gray-300 dark:bg-[#101828]  h-[450px] sm:h-screen w-full sticky top-0 overflow-hidden ">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-10"></div>

            <img
              src={img2}
              alt=""
              className="absolute inset-0 w-auto h-full sm:w-full object-fill sm:object-center"
            />
          </section>

          {/* 3️⃣ Section 3 */}
          <section className="h-[450px] bg-gray-300 dark:bg-[#101828]   sm:h-screen w-full sticky top-0 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-10"></div>

            <img
              src={img3}
              alt=""
              className="absolute inset-0 w-auto h-full sm:w-full object-fill sm:object-center"
            />
          </section>

          {/* 4️⃣ Final Section — Text & Button */}
          <section className="text-white min-h-screen w-full bg-white dark:bg-slate-950 sticky top-0 grid place-content-center overflow-hidden px-4 sm:px-6 md:px-12">
            {/* Grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center items-center text-center space-y-4 sm:space-y-6 py-10 sm:py-16">
              <h1 className="uppercase font-bold text-gray-700 dark:text-white text-2xl xs:text-3xl sm:text-4xl md:text-5xl leading-snug sm:leading-tight max-w-3xl">
                <span>Get your packages delivered quickly and</span>
                <br />
                <span className="text-primary">safely at affordable rates</span>
              </h1>

              <p className="text-gray-700 dark:text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed max-w-md sm:max-w-xl md:max-w-2xl">
                We’re dedicated to offering fast, reliable, and secure delivery
                services that meet your needs. Whether you're sending a small
                package or a large shipment, we ensure that your parcels are
                delivered on time.
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-5 mt-4 sm:mt-6">
                <ButtonHoverTopFlip
                  onClick={scrollToInput}
                  text="Track Your Parcel"
                  icon={<ArrowRight size={20} />}
                />
                <ButtonHoverTopFlip
                  onClick={() => navigate("/register")}
                  text="Send a Parcel"
                  icon={<ArrowRight size={20} />}
                />
              </div>
            </div>
          </section>
        </article>
      </main>

      {/* 5️⃣ Tracking Input Section */}
      <div
        ref={inputRef}
        className="flex justify-center w-full bg-white dark:bg-slate-950 py-10"
      >
        <div className="rounded-lg border p-4 w-[95%] sm:w-[80%] lg:w-[70%] flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0">
          <div className="text-center w-full">
            <h1 className="text-md font-bold">
              Track your Parcel here by Tracking Id
            </h1>
          </div>

          <div className="relative flex w-full items-center">
            <Crosshair className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />

            <input
              onChange={(e) => setTrackingId(e.target.value)}
              value={trackingId}
              type="text"
              placeholder="Enter Tracking ID"
              className="w-full pl-10 p-4 rounded-md border dark:text-gray-300 text-black focus:outline-none text-center"
            />

            <Button
              onClick={handleRedirect}
              className="hidden sm:flex h-12 px-5 ml-2 items-center gap-2"
            >
              Track Parcel <ArrowRight size={23} />
            </Button>
          </div>

          <Button
            onClick={handleRedirect}
            className="sm:hidden w-full h-12 flex items-center justify-center gap-2"
          >
            Track Parcel <ArrowRight size={23} />
          </Button>
        </div>
      </div>
    </ReactLenis>
  );
}
