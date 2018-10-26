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
  }

  static ensureKey(key) {
    if (Count.counts[key] === undefined) Count.counts[key] = 0;
  }

  static get(key) {
    Count.ensureKey(key);
    return Count.counts[key];
  }
}

Count.counts = {};

export default Count;
