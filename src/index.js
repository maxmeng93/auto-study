const puppeteer = require('puppeteer-core');
const fse = require('fs-extra');
const dotenv = require('dotenv');
const getData = require('./getData');
const study = require('./study');
const config = require('../config');

const { executablePath, userAgent } = config;

dotenv.config();

(async () => {
  const { baseURL } = config

  const { SESSION } = process.env;
  if (!SESSION) {
    console.warn('缺少 SESSION 。')
    return;
  }

  const browser = await puppeteer.launch({
    headless: false,
    executablePath,
    defaultViewport: {
      width: 1200,
      height: 900
    },
  });

  setTimeout(async () => {
    await getData(page);
    await browser.close();
  }, 60 * 60 * 1000);

  const page = await browser.newPage();

  await page.setDefaultTimeout(60 * 1000);

  await page.setCookie({
    url: baseURL,
    name: 'session',
    value: SESSION,
  });

  await page.setUserAgent(userAgent);

  let newData = [];
  try {
    const data = await fse.readFile('./data.json');
    newData = JSON.parse(data.toString());
    console.log('使用 data.json 缓存');
  } catch (err) {
    newData = await getData(page);
  }

  await study(page, newData);

  // 获取最新进度
  await getData(page);

  await browser.close();
})();

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});
