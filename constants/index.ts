const tutorialContent = {
  step_1: {
    imageUrl: "/turtorial/createTrip.gif",
    videoUrl: "/video/createTrip.mp4",
    msgs: [
      "設定行程開始與結束的日期",
      "可加入多個目的地城市",
      "為行程自訂一個代表性名稱",
    ],
    msg: "可以設定行程起訖日期、加入多個目的地城市，並為行程取一個名稱",
  },
  step_2: {
    imageUrl: "/turtorial/editTrip.gif",
    videoUrl: "/video/editTrip.mp4",
    msgs: [
      "依據日期，搜尋並加入欲前往的景點",
      "設定出發時間、景點停留時間及交通方式",
      "以拖曳方式調整旅程順序",
    ],
    msg: "為每個日期加入想要去的景點，並設定出發時間、景點停留時間以及交通方式等，取得完整的時間規劃結果，更可以使用拖曳方式調整旅程順序！",
  },
  step_3: {
    imageUrl: "/turtorial/share-trip.gif",
    videoUrl: "/video/shareTrip.mp4",
    msgs: [
      "規劃完成後，可將行程設定為公開",
      "以連結方式分享給親朋好友",
      "可在「探索行程」中瀏覽已公開的行程列表",
    ],
    msg: "規劃完成後，可以將行程設定為公開，除了能以連結方式分享給親朋好友外，也可在「探索行程」中瀏覽已公開的行程列表。",
  },
};

const coverPhotos = [
  "background-1.jpg",
  "background-2.jpg",
  "background-3.jpg",
  "background-4.jpg",
  "background-5.jpg",
  "background-6.jpg",
  "background-7.jpg",
  "background-8.jpg",
];

const directionsData = {
  distance: {
    text: "5.0 公里",
    value: 4802,
  },
  duration: {
    text: "20 分鐘",
    value: 929,
  },
};

export { tutorialContent, directionsData, coverPhotos };
