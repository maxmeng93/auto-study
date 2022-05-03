// 自动学习

// 参考资料
const studyMaterial = async (page) => {
  // const url = 'https://lms.ouchn.cn/course/50000000143/learning-activity/full-screen#/50000020602';

  // await page.goto(url, {
  //   waitUntil: 'networkidle2' // 网络空闲说明加载完毕
  // });

  const list = await page.$$('.attachment-row');

  for (let i = 0; i < list.length; i++) {
    // 打开附件
    await list[i].click();
    await page.waitForTimeout(Math.floor(Math.random() * 1000 + 6000));

    const clonseBtn = await page.$('#file-previewer-with-note .right.close');
    clonseBtn.click();

    await page.waitForTimeout(Math.floor(Math.random() * 1000 + 3000));
  }
}

const studyOnlineVideo = async (page) => {
  // const url = 'https://lms.ouchn.cn/course/50000000143/learning-activity/full-screen#/50000020866';

  // await page.goto(url, {
  //   waitUntil: 'networkidle2' // 网络空闲说明加载完毕
  // });

  await page.waitForTimeout(Math.floor(Math.random() * 1000 + 3000));

  const playBtn = await page.waitForSelector('.mvp-toggle-play.mvp-first-btn-margin');
  playBtn.click();

  await page.evaluate(async () => {
    return new Promise((resolve, reject) => {
      const video = document.querySelector('video');
      // 16倍速
      video.playbackRate = 16;
      // 静音
      // video.muted = true;
      video.addEventListener('ended', () => {
        resolve();
      })
      video.addEventListener('error', () => {
        reject();
      })
    })
  });
}

const study = async (page, courses) => {
  // const types = ['参考资料'];
  // const types = ['页面', '参考资料', '音视频教材'];
  const types = ['页面', '音视频教材'];

  for (let i = 0; i < courses.length; i++) {
    const { children } = courses[i];
    for (let x = 0; x < children.length; x++) {
      const { type, href, id, title, status } = children[x];

      if (types.indexOf(type) === -1) continue;
      if (status === 'full') continue;

      console.log(`${type} - ${id} - ${title}`);

      await page.goto(href, {
        waitUntil: 'networkidle2' // 网络空闲说明加载完毕
      });

      if (type === '参考资料') {
        await studyMaterial(page);
      }

      if (type === '音视频教材') {
        await studyOnlineVideo(page);
      }

      // 停留几秒钟
      await page.waitForTimeout(Math.floor(Math.random() * 1000) + 3000);
    }
  }
}

module.exports = study;