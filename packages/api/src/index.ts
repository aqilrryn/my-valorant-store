import { scrape } from "./services/scrapingService";

try {
  console.clear();
  console.log("start scraper");
  scrape(
    "https://valorant.fandom.com/wiki/Weapon_Skins",
    "Prime",
    "Classic"
  ).then((result) => {
    console.log(result);
    console.log("stop scraper");
  });
} catch (error) {
  console.log(error);
}
