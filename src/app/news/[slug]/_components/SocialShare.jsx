import {
  FaCalendarAlt,
  FaUser,
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

const SocialShare = () => {
  return (
    <div className="">
      <span className="text-lg font-semibold text-gray-900 mr-4">Share:</span>
      <button className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition mr-2">
        <FaFacebookF size={18} />
      </button>
      <button className="p-2 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition mr-2">
        <FaTwitter size={18} />
      </button>
      <button className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition">
        <FaWhatsapp size={18} />
      </button>
    </div>
  );
};

export default SocialShare;
