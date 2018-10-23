export const CANVAS_HEIGHT = 600; 
export const CANVAS_WIDTH = 1000; 

export const sample = (array) => {
  return array[Math.floor(Math.random() * array.length)];
}; 

export const randomInt = (min, max) => {
  min = Math.ceil(min); 
  max = Math.floor(max); 
  return Math.floor(Math.random() * (max - min)) + min; 
}; 
