import NewsCard from "@/components/shared/NewsCard";
import NewsCard3 from "@/components/shared/NewsCard3";

const CarNews = () => {
  const cars = [
    {
      id: 1,
      title: "Ather 450X Review – Is It the Best Electric Scooter?",
      image: "/scooters/s1.jpg",
      author: "Tech Expert",
      date: "Dec 5, 2024",
      tag: "Electric",
      excerpt:
        "Ather 450X continues to dominate the EV market with performance, design, and ...",
    },
    {
      id: 2,
      title: "TVS Jupiter – Why It's Still the Best Family Scooter",
      image: "/cycles/c2.jpg",
      author: "Drive Daily",
      date: "Nov 28, 2024",
      tag: "Petrol",
      excerpt:
        "TVS Jupiter remains a top choice for mileage, comfort, and reliability. Let’s explore why it still leads its segment...",
    },
    {
      id: 3,
      title: "Ola S1 Air Long-Term Review – Should You Buy It?",
      image: "/bikes/b3.jpg",
      author: "Reviewer",
      date: "Nov 15, 2024",
      tag: "Electric",
      excerpt:
        "Ola S1 Air promises range, design, and new software upgrades. We tested it for 30 days — here are the results...",
    },
    {
      id: 4,
      title: "Honda Activa 6G – Still King of Petrol Scooters?",
      image: "/cars/c4.jpg",
      author: "Bike Journal",
      date: "Oct 30, 2024",
      tag: "Petrol",
      excerpt:
        "Honda Activa 6G remains the most trusted scooter in India. What makes it so popular after all these years?",
    },
  ];

  return (
    <section className="container max-w-[1200px] mx-auto px-4 py-10">
      {/* Header */}
      <h3 className="car_h3 mb-4 text-gray-900">Car News</h3>

      {/* News Grid (Mobile) */}
      <div className="lg:hidden grid grid-cols-2 gap-4">
        {cars?.slice(0, 4)?.map((news, index) => (
          <NewsCard key={news.id} news={news} index={index} />
        ))}
      </div>

      <div className="col-span-3 hidden lg:flex gap-4">
        {/* First Column: 1 news */}
        <div className="flex-1">
          {cars.slice(0, 1).map((news, index) => (
            <NewsCard key={news.id} news={news} index={index} />
          ))}
        </div>

        {/* Second Column: 3 news */}
        <div className="flex-1 flex flex-col gap-4">
          {cars.slice(1, 4).map((news, index) => (
            <NewsCard3 key={news.id} news={news} index={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarNews;
