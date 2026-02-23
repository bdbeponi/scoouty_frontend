import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import ButtonPrimary2 from "../custom/ButtonPrimary2";
import Image from "next/image";

const ServiceCard = ({ service, index }) => {
  return (
    <motion.div
      key={index}
      variants={fadeIn("fade", 0.1 * (index + 0.5))}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="relative bg-white hover:bg-secondary/10 p-2 md:p-4 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col justify-start items-center min-h-[220px] overflow-hidden border border-gray-200 hover:border-secondary/10"
    >
      {/* Animated background circles */}
      <div className="relative w-24">
        <div className="absolute size-16 group-hover:size-8 rounded-full bg-secondary/40 top-0 group-hover:top-none right-0 group-hover:right-full mx-auto z-0 transition-all duration-300"></div>
        <div className="absolute size-8 group-hover:size-20 rounded-full bg-secondary/40 bottom-full group-hover:bottom-0 left-full group-hover:left-0 mx-auto z-0 transition-all duration-300"></div>
        {service.icon && (
          <div className="relative mb-0 z-10 ">{service.icon}</div>
        )}

        {service.image && (
          <div className="relative mb-0 z-10 flex justify-center">
            <Image
              src={service.image}
              alt="Service Image"
              width={56}
              height={56}
              className="h-auto w-20 rounded-lg transition-all duration-100 hover:opacity-80 "
              unoptimized
            />
          </div>
        )}
      </div>

      {/* Title - Always visible */}
      <h5 className="car_h5 text-gray-800 font-semibold my-2 text-center">
        {service.title}
      </h5>

      {/* Description - Hides on hover */}
      <div className="relative overflow-hidden w-full">
        <p className="text-sm md:text-base text-gray-800 text-center transform group-hover:-translate-y-full group-hover:opacity-0 transition-all duration-300">
          {service.description}
        </p>
      </div>

      {/* Button - Appears on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-full group-hover:-translate-y-0 transition-all duration-300">
        <ButtonPrimary2 text="View Details" href={service.link} />
      </div>
    </motion.div>
  );
};

export default ServiceCard;
