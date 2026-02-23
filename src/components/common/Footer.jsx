"use client";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaWhatsapp,
  FaTelegramPlane,
  FaPinterestP,
  FaGoogle,
} from "react-icons/fa";
import { SiTiktok, SiThreads } from "react-icons/si";

import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
import Container from "../custom/Container";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { footerData } from "@/data/footerData";
import { useGetSettingsQuery } from "@/redux/features/settingsApi";
import { baseUriBackend } from "@/redux/url/url";
import Image from "next/image";
import { FiMail } from "react-icons/fi";
import { useCreateEmailApiMutation } from "@/redux/features/emailSend";
import { toast } from "sonner";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [openSection, setOpenSection] = useState(null);
  const toggleSection = (sec) =>
    setOpenSection(openSection === sec ? null : sec);

  const { data: settings } = useGetSettingsQuery();

  const [createEmail, { isLoading }] = useCreateEmailApiMutation();
  const handleSubmitEmail = async () => {
    if (!email) return alert("Please enter a valid email");

    try {
      await createEmail({ email }).unwrap();
      toast("Subscribed successfully!");
      setEmail("");
    } catch (err) {
      toast("Failed to subscribe");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmitEmail();
    }
  };

  const socialLinksDynamic = [
    {
      name: "Facebook",
      url: settings?.data?.facebook,
      icon: <FaFacebookF />,
    },
    {
      name: "Instagram",
      url: settings?.data?.instagram,
      icon: <FaInstagram />,
    },
    {
      name: "LinkedIn",
      url: settings?.data?.linkedin,
      icon: <FaLinkedinIn />,
    },
    {
      name: "YouTube",
      url: settings?.data?.youtube,
      icon: <FaYoutube />,
    },
    {
      name: "Twitter (X)",
      url: settings?.data?.twitter,
      icon: <FaTwitter />,
    },
    {
      name: "TikTok",
      url: settings?.data?.tiktok,
      icon: <SiTiktok />,
    },
    {
      name: "Pinterest",
      url: settings?.data?.Pinterest
        ? settings.data.Pinterest.startsWith("http")
          ? settings.data.Pinterest
          : `https://${settings.data.Pinterest}`
        : "",
      icon: <FaPinterestP />,
    },
    {
      name: "Telegram",
      url: settings?.data?.telegram
        ? `https://t.me/+${settings.data.telegram}`
        : "",
      icon: <FaTelegramPlane />,
    },
    {
      name: "WhatsApp",
      url: settings?.data?.whatsapp
        ? `https://wa.me/${settings.data.whatsapp}`
        : "",
      icon: <FaWhatsapp />,
    },
    {
      name: "Google My Business",
      url: settings?.data?.GMB,
      icon: <FaGoogle />,
    },
  ].filter((social) => social.url && social.url.trim() !== "");

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8 lg:pt-16 lg:pb-10">
      <Container>
        {/* Desktop Footer */}
        <div className="hidden sm:grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-10">
          {/* Company Info - Wider section */}
          <div className="lg:col-span-5">
            <div className="mb-6">
              <p className="text-gray-300 leading-relaxed mb-6 text-sm lg:text-base">
                <a
                  href="/"
                  className="font-semibold text-gray-200 hover:text-secondary transition-colors"
                >
                  scootylelo.com
                </a>{" "}
                shares helpful blogs, reviews, and updates on scooters, bikes,
                and electric scooters, including the latest launches, trends,
                and tips for riders.
              </p>
            </div>

            {/* Email Subscription - Enhanced design */}
            <div className="max-w-lg">
              <p className="text-gray-400 text-sm mb-4">
                Subscribe to get the latest news and updates about scooters and
                bikes.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  />
                </div>
                <button
                  onClick={handleSubmitEmail}
                  disabled={isLoading}
                  className="bg-ternary hover:bg-red-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
                >
                  {isLoading ? "Subscribing..." : "Subscribe"}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 lg:col-start-7">
            <h3 className="text-xl font-semibold mb-6 pb-3 border-b border-gray-700">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerData.usefulLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.url}
                    className="text-gray-300 hover:text-secondary transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-gray-600 rounded-full mr-3 group-hover:bg-secondary transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Menu */}
          <div className="lg:col-span-3 lg:col-start-10">
            <h3 className="text-xl font-semibold mb-6 pb-3 border-b border-gray-700">
              Menu
            </h3>
            <ul className="space-y-3">
              {footerData.vehicles.map((vehicle, index) => (
                <li key={index}>
                  <Link
                    href={vehicle.url}
                    className="text-gray-300 hover:text-secondary transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-gray-600 rounded-full mr-3 group-hover:bg-secondary transition-colors"></span>
                    {vehicle.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile Footer (Accordion) */}
        <div className="sm:hidden mb-8">
          {/* Company Info */}
          <div className="mb-8">
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              <a href="/" className="font-semibold text-gray-200">
                scootylelo.com
              </a>{" "}
              shares helpful blogs, reviews, and updates on scooters, bikes, and
              electric scooters.
            </p>

            {/* Email Input */}
            <div className="mb-8">
              <div className="flex flex-col gap-3">
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none"
                  />
                </div>
                <button
                  onClick={handleSubmitEmail}
                  disabled={isLoading}
                  className="bg-ternary hover:bg-red-700 text-white font-medium px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isLoading ? "Subscribing..." : "Subscribe"}
                </button>
              </div>
            </div>
          </div>

          {/* Accordion Sections */}
          <div className="space-y-4">
            {["useful", "vehicles"].map((section) => {
              const dataMap = {
                useful: footerData.usefulLinks,
                vehicles: footerData.vehicles,
              };
              const titleMap = {
                useful: "Quick Links",
                vehicles: "Menu",
              };
              return (
                <div
                  key={section}
                  className="border-b border-gray-800 pb-4 last:border-b-0"
                >
                  <button
                    onClick={() => toggleSection(section)}
                    className="flex justify-between items-center w-full py-3 text-base font-semibold text-white"
                  >
                    {titleMap[section]}
                    <FaChevronDown
                      className={`transform transition-transform duration-300 ${
                        openSection === section ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openSection === section && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="space-y-3 overflow-hidden pl-2 pt-2"
                      >
                        {dataMap[section].map((item, index) => (
                          <li key={index}>
                            <Link
                              href={item.url}
                              className="text-gray-300 hover:text-secondary transition-colors py-2 block"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-gray-700 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} {footerData.copyright}. All rights
            reserved.
          </p>
          <div className="flex flex-wrap gap-3">
            {socialLinksDynamic.map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-secondary p-2 rounded-full transition text-white text-sm"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
