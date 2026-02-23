// src/app/index.js

import HomeCarousel from "./_components/HeroCarousel";
import Feature from "./_view/Feature";
import FeaturedBrands from "./_view/FeaturedBrands";
import FlashSale from "./_view/FlashSale";
import LatestUpdates from "./_view/LatestUpdates";
import NewArrivals from "./_view/NewArrivals";
import Trending from "./_view/Trending";
import Upcoming from "./_view/Upcoming";

export default function Home() {
  return (
    <main>
      <HomeCarousel />
      <FeaturedBrands />

      <LatestUpdates />
      <Feature />
      <NewArrivals />
      <Trending />
      <Upcoming />
      <FlashSale />
    </main>
  );
}
