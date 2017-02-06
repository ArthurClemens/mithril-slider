import m from "mithril";

const DATA_URL = "data/server.json";

export const getPageData = (url = DATA_URL) =>
  m.request({
    method: "GET",
    url: url
  });

export const fadeInImage = (el, url, callback) => {
  const showImage = () => {
    el.style.backgroundImage = `url(${url})`;
    el.style.opacity = 1;
    el.dataset.seen = true;
    if (callback) {
      setTimeout(() => {
        callback();
      }, 500);
    }
  };
  if (!el.dataset.seen) {
    el.style.opacity = 0;
    let img = new Image();
    img.onload = () => {
      showImage();
    };
    img.src = url;
  } else {
    showImage();
  }
};