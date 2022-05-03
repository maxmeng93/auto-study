const puppeteer = require('puppeteer');
const fse = require('fs-extra');

const baseURL = 'https://lms.ouchn.cn'

const getCourseDetail = async (page, course) => {

  const { href, id, title } = course;
  const children = [];

  const name = `${id} - ${title}`;

  console.log(name);

  await page.goto(href, {
    waitUntil: 'networkidle2' // 网络空闲说明加载完毕
  });

  // 点击展开所有课程
  const toggleBtn = await page.$('#course-section');
  await toggleBtn?.click();

  // 只显示未完成的课程
  // const filterInput = await page.$('.formative-task-filter.ng-scope input');
  // await filterInput.click();

  // 等待页面渲染完毕
  await page.waitForTimeout(5000);

  const list = await page.$$('.learning-activity.ng-scope');

  for (let i = 0; i < list.length; i++) {
    let itemId = await page.evaluate(el => el.getAttribute('id'), list[i])
    itemId = itemId.replace('learning-activity-', '');
    const type = await list[i].$eval('.font', el => el.getAttribute('title'));
    const title = await list[i].$eval('.activity-title > a.title', el => el.textContent);

    // https://lms.ouchn.cn/course/50000000143/learning-activity/full-screen#/50000020596
    const href = `${baseURL}/course/${id}/learning-activity/full-screen#/${itemId}`;
    const { status, statusStr } = await list[i].$eval('.activity-operations-container > .completeness', el => {
      return {
        status: el.getAttribute('class').replace('completeness', '').trim(),
        statusStr: el.getAttribute('title'),
      }
    })
    children.push({ id: itemId, type, title, href, status, statusStr })
  }

  // 课程详情页截图
  await page.screenshot({ path: `./images/${name}.png`, fullPage: true });

  return { ...course, children };
}

module.exports = getCourseDetail;