import Component from './component';

class Speed extends Component {
  constructor() {
    super();
    this.speedMultiplier = 1;
    }

  setRegularSpeed() {
    this.speedMultiplier = 1;
  }

  setSlowedSpeed() {
    this.speedMultiplier = 0.2;
  }
 }

export default Speed;
