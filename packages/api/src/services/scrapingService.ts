import puppeteer from "puppeteer";

export const scrape = async (url: string, collection: string, name: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  let result = await page.evaluate(
    (collection: string, name: string) => {
      const span = document.querySelector(
        `span[id*="${collection}_Collection"]`
      );

      const heading = span?.parentElement;
      const table = heading?.nextElementSibling as HTMLTableElement;

      return table?.rows.length > 0
        ? Array.from(table.rows)
            .map((row) => {
              return row.cells[1].innerText === name
                ? row.cells[0].children[0].children[0].getAttribute("data-src")
                : undefined;
            })
            .filter((val) => val !== undefined)[0]
        : undefined;
    },
    collection,
    name
  );

  result = result?.split("/revision")[0];

  await browser.close();

  return result;
};
