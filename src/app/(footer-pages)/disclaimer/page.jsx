export const metadata = {
  title: "Disclaimer | scootylelo.com",
  description:
    "Read the scootylelo.com Disclaimer to understand content accuracy, limitations, third-party links, and liability related to vehicle news and reviews.",
  openGraph: {
    title: "Disclaimer | scootylelo.com",
    description:
      "scootylelo.com publishes car, bike, scooter, and cycle news and reviews for informational purposes only. Learn about our content limitations and responsibilities.",
    url: "https://scootylelo.com/disclaimer",
    siteName: "Meragadi",
    type: "website",
  },
};

export default function DisclaimerPage() {
  return (
    <main className="bg-gray-50">
      {/* HERO */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-[1200px] mx-auto px-4 py-16 lg:py-24 mt-20">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">
            Disclaimer
          </h1>
          <p className="text-gray-300 text-lg">
            Last Updated: <strong>3rd January, 2026</strong>
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-[1200px] mx-auto px-4 py-14 space-y-10">
        {/* Intro */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <p className="text-gray-700 leading-relaxed mb-4">
            The information provided on <strong>scootylelo.com</strong> is for
            general informational purposes only. All content published on this
            website relates to cars, bikes, scooters, and cycles, including
            news, upcoming launches, features, and specifications.
          </p>
          <p className="text-gray-700 leading-relaxed">
            While we strive to keep the information accurate and up to date,
            <strong>scootylelo.com</strong> makes no warranties or guarantees
            about the completeness, reliability, or accuracy of any information
            on this website.
          </p>
        </div>

        {/* Vehicle Information */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Vehicle Information
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Vehicle prices, specifications, features, availability, and launch
            details mentioned on <strong>scootylelo.com</strong> are based on
            official announcements, media reports, and trusted sources at the
            time of publishing. These details may change without prior notice.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Readers are advised to verify information with official
            manufacturers, dealers, or company websites before making any
            purchase or decision.
          </p>
        </div>

        {/* No Professional Advice */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            No Professional Advice
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            The content on <strong>scootylelo.com</strong> does not constitute
            professional, legal, financial, or technical advice. Any action you
            take based on the information found on this website is strictly at
            your own risk.
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>scootylelo.com</strong> will not be liable for any losses,
            damages, or issues arising from the use of our content.
          </p>
        </div>

        {/* External Links */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            External Links
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            <strong>scootylelo.com</strong> may contain links to external websites
            for additional information. We do not control or take responsibility
            for the content, accuracy, or policies of any third-party websites.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Visiting external links is at the user’s own discretion.
          </p>
        </div>

        {/* Content Responsibility */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Content Responsibility
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            All opinions expressed on <strong>scootylelo.com</strong> are personal
            views based on research and publicly available information. We do
            not intend to harm or misrepresent any brand, company, or
            individual.
          </p>
          <p className="text-gray-700 leading-relaxed">
            If you find any incorrect information or have concerns regarding
            content, you may contact us for correction or clarification.
          </p>
        </div>

        {/* Consent */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Consent</h2>
          <p className="text-gray-700 leading-relaxed">
            By using our website, you hereby consent to our disclaimer and agree
            to its terms.
          </p>
        </div>

        {/* Contact */}
        <div className="bg-gray-900 text-white rounded-xl p-8">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p>
            Email: <strong>scootylelo01@gmail.com</strong>
          </p>
          <p>
            Business Email: <strong>scootylelo01@gmail.com</strong>
          </p>
        </div>
      </section>
    </main>
  );
}
