import Image from "next/image";
import Link from "next/link";

const BrandCard = ({ brand }) => {
  return (
    <Link
      href={`/scooters/${brand.slug}`}
      className="flex flex-col items-center justify-center gap-2 p-4 border border-gray-100 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 "
    >
      <Image
        src={brand.logo}
        alt={brand.name}
        width={60}
        height={60}
        className="object-contain"
      />
      <span className="text-sm text-gray-700 font-medium">{brand.name}</span>
    </Link>
  );
};

export default BrandCard;
