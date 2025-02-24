import Image from "next/image";
import Car from "../../public/cars/collection.png";
import BookingForm from "@/components/BookingForm";
import WorkingSteps from "@/components/WorkingSteps";
import BrandSlider from "@/components/BrandSlider";
import WhyChooseUs from "@/components/WhyChooseUs";
import BestServices from "@/components/BestServices";
import Vector from "../../public/vector.png"
export default function Home() {
  return (
    <>
    <div className=" pt-28 pb-10  px-2 md:px-16  bg-soft-gray-blue text-black">
      <div className="flex flex-col lg:flex-row justify-between  py-10 ">
        <div className="flex text-center lg:text-left w-full lg:w-[40%] flex-col justify-center mb-5  ">
          <h1 className="font-bold  text-5xl mb-4 font-serif  text-primary ">AL MARJAN</h1>

          <h1 className="font-bold text-6xl ">
            Find, book, and
              <br className="hidden lg:block" /> rental car <span className="text-primary relative ">Easily <Image alt="Vector" className="absolute  right-0" src={Vector} /></span>
          </h1>
          <h3 className="lg:w-[90%] mt-8 text-slate-500 ">
            Choose from a variety of vehicles at best available rates from the
            only 5-star Google rated company in Ras Al Khaimah UAE
          </h3>
        </div>
        <div className="relative   lg:mx-10 w-full lg:w-[60%]    text-primary ">
          <h1 className="text-9xl font-semibold   text-center font-serif  ">DUBAI</h1>
          <Image
            className="absolute top-4 md:top-0  lg:top-1 "
            src={Car}
            alt="Car"
          />
        </div>
      </div>

      <BookingForm />

    </div>
      <WorkingSteps />
      
      <WhyChooseUs />
      
      
      <BestServices/>
      <BrandSlider />
    </>
  );
}
