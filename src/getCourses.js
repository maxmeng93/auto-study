const baseURL = 'https://lms.ouchn.cn'

const getCourses = async (page) => {

  const url = `${baseURL}/user/courses#/`
  await page.goto(url, {
    waitUntil: 'networkidle2' // 网络空闲说明加载完毕
  });

  const list = await page.$$('.course.ng-scope');
  const courses = [];

  for (let i = 0; i < list.length; i++) {
    const id = await page.evaluate(el => el.getAttribute('data-course-id'), list[i]);
    const title = await list[i].$eval('.course-name', el => el.getAttribute('original-title'));
    const href = await list[i].$eval('.course-name > a', el => el.getAttribute('href'));
    courses.push({ id, title, href: `${baseURL}${href}` });
  }

  // 截图
  await page.screenshot({ path: './images/courses.png', fullPage: true });

  return courses
}

module.exports = getCourses;