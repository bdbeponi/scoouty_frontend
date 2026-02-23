export const metadata = {
  title: "About Meragadi.com | Trusted Vehicle News, Updates & Reviews",
  description:
    "Learn about Meragadi.com – your dedicated source for car, bike, scooter, and cycle news, launches, and updates in India.",
  keywords: [
    "Meragadi",
    "vehicle news",
    "car news",
    "bike news",
    "scooter news",
    "cycle news",
    "vehicle launches",
    "Indian automotive",
  ],
  openGraph: {
    title: "About Meragadi.com",
    description:
      "Meragadi.com provides the latest updates, launches, specifications, and highlights for cars, bikes, scooters, and cycles in India.",
    url: "https://meragadi.com/about-us",
    siteName: "Meragadi",
    type: "website",
  },
};

export default function AboutUsPage() {
  return (
    <main className="bg-gray-50">
      {/* HERO */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-[1200px] mx-auto px-4 py-16 lg:py-24 mt-20">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-6">About Us</h1>
          <p className="text-lg text-gray-300 max-w-3xl">
            Meragadi.com is a dedicated news blog focused entirely on the world
            of vehicles. We bring our readers the latest and most accurate
            information about cars, bikes, scooters, and cycles that are
            launching or coming soon to the Indian market.
          </p>
          <p className="text-lg text-gray-300 max-w-3xl mt-4">
            Our goal is to keep vehicle enthusiasts, buyers, and everyday
            readers informed with clear, honest, and up-to-date vehicle news.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-[1200px] mx-auto px-4 py-14 space-y-12">
        {/* What We Do */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            What We Do at Meragadi.com
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            At Meragadi.com, we publish the latest car, bike, scooter, and cycle
            launches, upcoming vehicle news and updates, key features,
            specifications, and highlights, and easy-to-understand information
            for buyers and enthusiasts.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We focus only on vehicles, so our content stays relevant, focused,
            and reliable.
          </p>
        </div>

        {/* Our Aim */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Aim</h2>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to make vehicle information simple, accessible, and
            trustworthy for everyone. We aim to help readers understand new
            vehicles without confusing technical language.
          </p>
        </div>

        {/* About the Founder */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About the Founder
          </h2>
          <p className="text-gray-700 leading-relaxed">
            My name is <strong>Sanjit Das</strong>, and I am the founder of
            Meragadi.com. I am from Sonapur, Guwahati, Assam, and I created this
            platform to share reliable and useful vehicle information with
            readers across India.
          </p>
        </div>

        {/* Our Office */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Office</h2>
          <p className="text-gray-700 leading-relaxed">
            RS Complex
            <br />
            College Gate, Sonapur
            <br />
            Guwahati, Assam, India
          </p>
        </div>

        {/* Contact Us */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-700 leading-relaxed mb-1">
            If you have questions, suggestions, or business inquiries, feel free
            to reach out to us.
          </p>
          <p className="text-gray-700">
            Email: <strong>meragadi.com@gmail.com</strong>
            <br />
            Business Email: <strong>contact@meragadi.com</strong>
          </p>
        </div>

        {/* Why Trust */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Trust Meragadi.com
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Meragadi.com focuses only on vehicle-related content, uses simple
            and reader-friendly language, provides regular updates on new and
            upcoming vehicles, and follows a clean, honest, and professional
            approach.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Thank you for visiting Meragadi.com and being part of our journey.
          </p>
        </div>

        {/* Closing */}
        <div className="bg-gray-900 text-white rounded-xl p-8 text-center">
          <p className="mb-2">
            Thank you for fueling your passion with Meragadi.com.
          </p>
          <p className="font-semibold">
            Buckle up, stay informed, and enjoy the ride.
          </p>
        </div>
      </section>
    </main>
  );
}
