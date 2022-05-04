const puppeteer = require('puppeteer');
const fse = require('fs-extra');
const dotenv = require('dotenv');
const getCourses = require('./getCourses');
const getCourseDetail = require('./getCourseDetail');
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

  const page = await browser.newPage();

  await page.setDefaultTimeout(60 * 1000);

  await page.setCookie({
    url: baseURL,
    name: 'session',
    value: SESSION,
  });

  await page.setUserAgent(userAgent);

  const courses = await getCourses(page);

  const newData = []

  for (let i = 0; i < courses.length; i++) {
    await newData.push(await getCourseDetail(page, courses[i]));
  }

  await fse.writeFile('./data.json', JSON.stringify(newData, undefined, 2));

  await study(page, newData);

  await browser.close();
})();

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});
