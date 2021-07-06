const ap = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: false,
    autoplay: false,
    audio: [
      {
        name: '起风了',
        artist: '买辣椒也用券',
        url: '../music/index/买辣椒也用券-起风了.mp3',
      },
      {
        name: '白兰鸽巡游记',
        artist: '丢火车乐队',
        url: '../music/index/丢火车乐队-白兰鸽巡游记.mp3',
      }
    ]
});