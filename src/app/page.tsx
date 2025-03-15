import Image from "next/image";
import Car from "../../public/cars/collection.png";
import WorkingSteps from "@/components/WorkingSteps";
import BrandSlider from "@/components/BrandSlider";
import WhyChooseUs from "@/components/WhyChooseUs";
import BestServices from "@/components/BestServices";
import Vector from "../../public/vector.png";
import GoogleReviews from "./google-reviews/page";
import OldBookingForm from "@/components/OldBookingForm";
export default function Home() {
  return (
    <>
      <div className="pt-16  md:pt-28 pb-10  px-2 md:px-16  bg-soft-gray-blue text-black">
        <div className="flex flex-col lg:flex-row justify-between  py-10 ">
          <div className="flex text-center lg:text-left w-full lg:w-[50%] flex-col justify-center mb-5  ">
            <h1 className="text-4xl uppercase font-bold bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent font-serif">
              AL Marjan Rent Car
            </h1>

            <h2 className="font-bold text-4xl md:text-5xl ">
              Find, book, and
              <br className="hidden lg:block" /> rent your car{" "}
              <span className="text-primary relative ">
                Easily{" "}
                <Image
                  alt="Vector"
                  className="absolute  right-0"
                  src={Vector}
                />
              </span>
            </h2>
            <h2 className="lg:w-[90%] mt-8 text-slate-500">
              Choose from a variety of vehicles at best available rates from the
              only{" "}
              <strong className="text-orange-500 font-medium  shadow-sm">
                5 Stars{" "}
                <span className="bg-gradient-to-r from-blue-600 via-red-600 to-yellow-600 bg-clip-text text-transparent">
                  Google
                </span>
              </strong>{" "}
              rated company in Ras Al Khaimah UAE
            </h2>
          </div>
          <div className="relative   lg:mx-10 w-full lg:w-[50%]    text-primary ">
            <h3 className="text-4xl md:text-6xl uppercase mt-3 font-semibold text-center bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent font-serif">
              ras al khaimah
            </h3>
            <Image
              className="absolute top-0 "
              src={Car}
              alt="Car"
              objectFit="cover"
            />
          </div>
        </div>

        <OldBookingForm   />

        
      </div>
      <WorkingSteps />

      <WhyChooseUs />

      <BestServices />
      <GoogleReviews />
      <BrandSlider />
    </>
  );
}
