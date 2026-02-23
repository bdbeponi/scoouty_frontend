import Image from "next/image";
import Link from "next/link";

const InfoSection = ({ info }) => {
  return (
    <div className="flex justify-between items-start lg:items-center">
      <div className="">
        <div className="flex gap-4 items-center">
          <h3 className="car_h3 text-2xl md:text-3xl font-bold text-gray-900">
            {info?.title}
          </h3>
          {info?.image && (
            <Image
              src={info.image}
              alt="Your Company Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
              priority
            />
          )}
        </div>
        <p className="text-gray-600 car_p -mt-1">{info?.sub_title}</p>
      </div>

      <Link
        href={info?.link || "#"}
        className="text-primary car_h5 hover:text-primary font-semibold transition-colors min-w-20 mt-4"
      >
        View All →
      </Link>
    </div>
  );
};

export default InfoSection;
