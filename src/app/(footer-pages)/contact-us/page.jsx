"use client";

export default function ContactUsPage() {
  return (
    <main className="bg-gray-50">
      {/* HERO */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-[1200px] mx-auto px-4 py-16 lg:py-24 mt-20 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            We’re always happy to hear from our readers. If you have any
            questions, suggestions, feedback, or business-related inquiries,
            feel free to get in touch with us.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-[1200px] mx-auto px-4 py-14 space-y-12">
        {/* How to Connect */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            You Can Connect With Us
          </h2>
          <p className="text-gray-700 mb-4">
            You can contact us through email for any of the following:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Website-related queries</li>
            <li>Content suggestions or corrections</li>
            <li>Business, advertising, or collaboration inquiries</li>
          </ul>
        </div>

        {/* Emails */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Emails</h2>
          <p className="text-gray-700 mb-1">Connect with us at:</p>
          <p className="text-gray-900 font-medium mb-2">
            scootylelo01@gmail.com
          </p>
          <p className="text-gray-900 font-medium">scootylelo01@gmail.com</p>
        </div>

        {/* Office Address */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Office Address
          </h2>
          <p className="text-gray-700 mb-1">Find us here:</p>
          <p className="text-gray-900 font-medium">RS Complex</p>
          <p className="text-gray-900 font-medium">College Gate, Sonapur</p>
          <p className="text-gray-900 font-medium">Guwahati, Assam, India</p>
        </div>

        {/* About Meragadi */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About scootylelo.com
          </h2>
          <p className="text-gray-700 mb-4">
            scootylelo.com is a vehicle-focused news blog where we publish the
            latest updates on cars, bikes, scooters, and cycles. We aim to
            provide accurate, easy-to-understand, and timely information for our
            readers.
          </p>
          <p className="text-gray-700 font-medium">
            Thank you for visiting scootylelo.com. We appreciate your support and
            interest.
          </p>
        </div>
      </section>
    </main>
  );
}
