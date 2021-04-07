"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrape = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const scrape = async (url, collection, name) => {
    const browser = await puppeteer_1.default.launch();
    const page = await browser.newPage();
    await page.goto(url);
    let result = await page.evaluate((collection, name) => {
        const span = document.querySelector(`span[id*="${collection}_Collection"]`);
        const heading = span === null || span === void 0 ? void 0 : span.parentElement;
        const table = heading === null || heading === void 0 ? void 0 : heading.nextElementSibling;
        return (table === null || table === void 0 ? void 0 : table.rows.length) > 0
            ? Array.from(table.rows)
                .map((row) => {
                return row.cells[1].innerText === name
                    ? row.cells[0].children[0].children[0].getAttribute("data-src")
                    : undefined;
            })
                .filter((val) => val !== undefined)[0]
            : undefined;
    }, collection, name);
    result = result === null || result === void 0 ? void 0 : result.split("/revision")[0];
    await browser.close();
    return result;
};
exports.scrape = scrape;
//# sourceMappingURL=scrapingService.js.map