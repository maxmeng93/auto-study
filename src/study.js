const config = require('../config');

const { video: videoConfig, studyTypes } = config;

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

// 视频或视频
const playVideoOrAudio = async (page, tag = 'video') => {

  let playBtn = null;

  if (tag === 'video') {
    playBtn = await page.waitForSelector('.mvp-toggle-play.mvp-first-btn-margin');
  } else {
    playBtn = await page.waitForSelector('.audio-player-wrapper > .play > a')
  }

  playBtn.click();

  await page.evaluate(async (videoConfig, tag) => {
    return new Promise((resolve) => {

      const { playbackRate = 1, muted = false, volume = 0.5 } = videoConfig;

      const ele = document.querySelector(tag);

      // 当前播放进度
      let currentTime = ele.currentTime;
      console.log('currentTime', currentTime);
      // 倍速播放
      ele.playbackRate = playbackRate;
      // 是否静音
      ele.muted = muted;
      // 音量（0.0 - 1.0）
      ele.volume = volume;

      const timer = setTimeout(() => {
        const current = ele.currentTime;
        if (current === currentTime) {
          resolve()
        }
      }, 10 * 1000);

      ele.addEventListener('ended', () => {
        clearTimeout(timer);
        resolve();
      })
      ele.addEventListener('error', () => {
        clearTimeout(timer);
        resolve();
      })
      ele.addEventListener('play', () => {
        currentTime = ele.currentTime;
      })
    })
  }, videoConfig, tag);
}

// 音视频教材
const studyOnlineVideo = async (page) => {

  await page.waitForTimeout(Math.floor(Math.random() * 1000 + 3000));

  const video = await page.$('video');
  const audio = await page.$('audio');

  if (video) {
    await playVideoOrAudio(page, 'video');
  }

  if (audio) {
    await playVideoOrAudio(page, 'audio');
  }
}

const study = async (page, courses) => {
  console.log('study...')

  for (let i = 0; i < courses.length; i++) {
    const { children } = courses[i];
    for (let x = 0; x < children.length; x++) {
      const { type, href, id, title, status } = children[x];

      if (studyTypes.indexOf(type) === -1) continue;
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