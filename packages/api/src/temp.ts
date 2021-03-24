// import { scrape } from "./services/scrapingService";

import { authenticate } from "./services/rsoService";

require("dotenv-safe").config();

/* try {
  console.clear();
  /* 
  console.log("start scraper");
  scrape(
    "https://valorant.fandom.com/wiki/Weapon_Skins",
    "Prime",
    "Classic"
  ).then((result) => {
    console.log(result);
    console.log("stop scraper");
  });

  authenticate()
    .then((token) => {
      console.log(token);
    })
    .catch((err) => {
      console.log(err);
    });
} catch (error) {
  console.log(error);
} */
