const puppeteer = require('puppeteer');
const fse = require('fs-extra');
const dotenv = require('dotenv');
const getCourses = require('./getCourses');
const getCourseDetail = require('./getCourseDetail');
const study = require('./study');

dotenv.config();

(async () => {
  const baseURL = 'https://lms.ouchn.cn';

  console.log(process.env.SESSION)
  const { SESSION } = process.env;

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1200,
      height: 900
    },
    // 本地chrome
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });

  const page = await browser.newPage();

  await page.setCookie({
    url: baseURL,
    name: 'session',
    value: SESSION,
  });
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36')

  const courses = await getCourses(page);

  const newData = []

  for (let i = 0; i < courses.length; i++) {
    if (i === 0) await newData.push(await getCourseDetail(page, courses[i]));
  }

  await fse.writeFile('./data.json', JSON.stringify(newData, undefined, 2));

  await study(page, newData);

  await browser.close();
})();