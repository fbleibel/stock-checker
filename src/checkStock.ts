import puppeteer from 'puppeteer';

const URL = process.env.URL!;
const SIZE = 'Large';

type SizeButton = {
  text: string;
  disabled: boolean;
};

async function checkStock(): Promise<void> {
  console.log("Launching pupeteer...");
  const browser = await puppeteer.launch({
    // headless: false,   // 🔥 Shows the browser window
    // slowMo: 50,        // 🐢 Optional: slows down each action for easier debugging
    // defaultViewport: null // 🖥 Optional: uses your full screen size
    args: ['--no-sandbox', '--disable-setuid-sandbox'], // For GitHub Actions

  });
  const page = await browser.newPage();

  try {
    await page.goto(URL, { waitUntil: 'networkidle2' });
    console.log("Page loaded");

    const button = await page.waitForSelector(`button[aria-label="${SIZE}"]`);
    const isDisabled = await button!.evaluate(el => el.getAttribute('aria-disabled'));
    console.log(`aria-disabled: ${isDisabled}`);


  } finally {
    await browser.close();
  }
}

checkStock();
