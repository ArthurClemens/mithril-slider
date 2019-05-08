import FastClick from "fastclick";

const layer = document.body;
let fastClick;

const remove = () => {
  fastClick.destroy();
};

const add = () => {
  fastClick = new FastClick(layer);
};

const init = () => {
  add();
};

init();

export default {
  add: add,
  remove: remove
};