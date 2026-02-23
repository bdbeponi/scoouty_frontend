export const metadata = {
  title: "Page Not Found | Scooty Lelo",
  description:
    "Oops! The page you are looking for does not exist on scootylelo.com.",
  openGraph: {
    title: "Page Not Found | Scooty Lelo",
    description:
      "Oops! The page you are looking for does not exist on scootylelo.com.",
    url: "https://scootylelo.com/404",
    siteName: "Scooty Lelo",
    type: "website",
  },
};

const NotFoundPage = () => {
  return (
    <main className="bg-gray-50 flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center max-w-xl">
        <h1 className="text-6xl lg:text-7xl font-extrabold text-gray-900 mb-4">
          404
        </h1>
        <h2 className="text-2xl lg:text-3xl font-semibold text-gray-700 mb-6">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>
        <a
          href="/"
          className="inline-block bg-gray-900 text-white font-medium px-6 py-3 rounded-lg shadow hover:bg-gray-800 transition"
        >
          Go Back Home
        </a>
      </div>
    </main>
  );
};

export default NotFoundPage;
