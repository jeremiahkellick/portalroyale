import Component from './component';

class ObjectTracker extends Component {
  constructor(key, info) {
    super();
    this.key = key;
    this.info = info;
    ObjectTracker.ensureKey(key);
    ObjectTracker.objects[key][this.info.id] = info;
    ObjectTracker.onChangeFunctions[key].forEach(func =>
      func(ObjectTracker.get(key))
    );
  }

  onDestroy() {
    delete ObjectTracker.objects[this.key][this.info.id];
    ObjectTracker.onChangeFunctions[this.key].forEach(func =>
      func(ObjectTracker.get(this.key))
    );
  }

  static onChange(key, func) {
    ObjectTracker.ensureKey(key);
    ObjectTracker.onChangeFunctions[key].push(func);
  }

  static ensureKey(key) {
    if (ObjectTracker.objects[key] === undefined) {
      ObjectTracker.objects[key] = {};
      ObjectTracker.onChangeFunctions[key] = [];
    }
  }

  static get(key) {
    this.ensureKey(key);
    return ObjectTracker.objects[key];
  }
}

ObjectTracker.objects = {};
ObjectTracker.onChangeFunctions = {};

export default ObjectTracker;
