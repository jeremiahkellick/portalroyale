class Time {
  static update() {
    Time.deltaTime = (new Date() - Time.prevUpdate) / 1000;
    Time.prevUpdate = new Date();
  }
}

Time.prevUpdate = new Date();
Time.deltaTime = 0.0167;

export default Time;
