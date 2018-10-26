export let CANVAS_WIDTH = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
export let CANVAS_HEIGHT = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

export const MAP_WIDTH = 2500;
export const MAP_HEIGHT = 2500;


export const sample = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const randomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};
