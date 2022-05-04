const config = {
  // 域名
  baseURL: 'https://lms.ouchn.cn',
  // 视频
  video: {
    // 倍速播放，最大16
    playbackRate: 8,
    // 是否静音
    muted: false,
    // 音量（0.0 - 1.0）
    volume: 0.1,
  },
  // 学习类型
  // studyTypes: ['页面', '参考资料', '音视频教材'],
  studyTypes: ['音视频教材'],
  // 本机 Chrome 浏览器，自动学习视频类课程必须配置这个参数，否则视频无法播放
  // executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36'
}

module.exports = config;