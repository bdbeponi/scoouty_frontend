"use client";

import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaLinkedinIn,
  FaTelegramPlane,
  FaEnvelope,
} from "react-icons/fa";

const SocialShare2 = ({ title = "" }) => {
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  const openShare = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-full flex items-center gap-3 px-4 pt-4 rounded-xl border-t border-gray-300 mt-6">
      {/* Facebook */}
      <button
        onClick={() =>
          openShare(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              shareUrl,
            )}`,
          )
        }
        className="flex justify-center p-3 rounded-lg w-full bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        <FaFacebookF size={18} />
      </button>

      {/* Twitter / X */}
      <button
        onClick={() =>
          openShare(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(
              shareUrl,
            )}&text=${encodeURIComponent(title)}`,
          )
        }
        className="flex justify-center p-3 rounded-lg w-full bg-sky-500 text-white hover:bg-sky-600 transition"
      >
        <FaTwitter size={18} />
      </button>

      {/* WhatsApp */}
      <button
        onClick={() =>
          openShare(
            `https://wa.me/?text=${encodeURIComponent(`${title} ${shareUrl}`)}`,
          )
        }
        className="flex justify-center p-3 rounded-lg w-full bg-green-500 text-white hover:bg-green-600 transition"
      >
        <FaWhatsapp size={18} />
      </button>

      {/* LinkedIn */}
      <button
        onClick={() =>
          openShare(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
              shareUrl,
            )}`,
          )
        }
        className="flex justify-center p-3 rounded-lg w-full bg-blue-700 text-white hover:bg-blue-800 transition"
      >
        <FaLinkedinIn size={18} />
      </button>

      {/* Telegram */}
      <button
        onClick={() =>
          openShare(
            `https://t.me/share/url?url=${encodeURIComponent(
              shareUrl,
            )}&text=${encodeURIComponent(title)}`,
          )
        }
        className="flex justify-center p-3 rounded-lg w-full bg-cyan-500 text-white hover:bg-cyan-600 transition"
      >
        <FaTelegramPlane size={18} />
      </button>

      {/* Email */}
      <button
        onClick={() =>
          openShare(
            `mailto:?subject=${encodeURIComponent(
              title,
            )}&body=${encodeURIComponent(shareUrl)}`,
          )
        }
        className="flex justify-center p-3 rounded-lg w-full bg-gray-700 text-white hover:bg-gray-800 transition"
      >
        <FaEnvelope size={18} />
      </button>
    </div>
  );
};

export default SocialShare2;
