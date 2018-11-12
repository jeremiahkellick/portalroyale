import Component from './component';

class Message extends Component {

  constructor() {
    super();
    Message.message = this;
    this.messages = [];
  }

  receive(message) {
    this.dispatch({ type: "RECEIVE", message });
  }

  remove() {
    this.dispatch({ type: "REMOVE"});
  }

  handleAction(action) {
    switch (action.type) {
      case 'RECEIVE':
        this.messages.shift(action.message);
        break;
      case 'REMOVE':
        this.messages.pop();
        break;
      default:
    }
  }
}

export default Message;