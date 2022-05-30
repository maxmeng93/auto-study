const fse = require('fs-extra');
const getCourses = require('./getCourses');
const getCourseDetail = require('./getCourseDetail');

const getData = async (page) => {
  console.log('开始获取课程数据...');

  const courses = await getCourses(page);

  const newData = []

  for (let i = 0; i < courses.length; i++) {
    await newData.push(await getCourseDetail(page, courses[i]));
  }

  await fse.writeFile('./data.json', JSON.stringify(newData, undefined, 2));

  console.log('data.json save success');

  return newData;
}

module.exports = getData;
