import SyncedComponent from './synced_component';

class Test extends SyncedComponent {
  constructor(count, owned = false) {
    super(owned);
    this.count = count;
  }

  increment() {
    this.dispatch({ type: 'INCREMENT' });
  }

  handleAction(action) {
    switch (action.type) {
      case 'INCREMENT':
        this.count += 1;
        break;
      default:
    }
  }
}

export default Test;
