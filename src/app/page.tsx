import Image from "next/image";
import Car from "../../public/cars/collection.png";
import BookingForm from "@/components/BookingForm";
import WorkingSteps from "@/components/WorkingSteps";
import BrandSlider from "@/components/BrandSlider";
import WhyChooseUs from "@/components/WhyChooseUs";
import BestServices from "@/components/BestServices";
import Vector from "../../public/vector.png"
import GoogleReviews from "./google-reviews/page";
import OldBookingForm from "@/components/OldBookingForm";
export default function Home() {
  return (
    <>
    <div className="pt-[5.2rem] md:pt-28 pb-10  px-2 md:px-16  bg-soft-gray-blue text-black">
      <div className="flex flex-col lg:flex-row justify-between  py-10 ">
        <div className="flex text-center lg:text-left w-full lg:w-[40%] flex-col justify-center mb-5  ">
          <h1 className="font-bold  text-4xl md:text-5xl  mb-2 md:mb-4 font-serif  text-primary ">AL MARJAN</h1>

          <h2 className="font-bold text-5xl md:text-6xl ">
            Find, book, and
              <br className="hidden lg:block" /> rental car <span className="text-primary relative ">Easily <Image alt="Vector" className="absolute  right-0" src={Vector} /></span>
          </h2>
          <h2 className="lg:w-[90%] mt-8 text-slate-500 ">
            Choose from a variety of vehicles at best available rates from the
            only 5-star Google rated company in Ras Al Khaimah UAE
            </h2>
            
   
        </div>
        <div className="relative   lg:mx-10 w-full lg:w-[60%]    text-primary ">
          <h3 className="text-8xl md:text-9xl font-semibold   text-center font-serif  ">DUBAI</h3>
          <Image
            className="absolute top-3 md:top-0  lg:top-1 "
            src={Car}
            alt="Car"
          />
        </div>
      </div>

        {/* <BookingForm /> */}
        <OldBookingForm/>

    </div>
      <WorkingSteps />
      
      <WhyChooseUs />
      
      
      <BestServices />
      <GoogleReviews/>
      <BrandSlider />
    </>
  );
}
