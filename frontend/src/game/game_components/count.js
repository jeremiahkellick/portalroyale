import Component from './component';

class Count extends Component {
  constructor(key) {
    super();
    this.key = key;
    Count.ensureKey(key);
    Count.counts[key]++;
  }

  onDestroy() {
    Count.counts[this.key]--;
    Count.onDecreaseFunctions[this.key].forEach(func =>
      func(Count.counts[this.key])
    );
  }

  static onDecrease(key, func) {
    Count.ensureKey(key);
    Count.onDecreaseFunctions[key].push(func);
  }

  static ensureKey(key) {
    if (Count.counts[key] === undefined) {
      Count.counts[key] = 0;
      Count.onDecreaseFunctions[key] = [];
    }
  }

  static get(key) {
    Count.ensureKey(key);
    return Count.counts[key];
  }
}

Count.counts = {};
Count.onDecreaseFunctions = {};

export default Count;
