import GameObject from './game_object';
import Transform from './transform';
import TransformSyncronizer from './transform_syncronizer';
import Syncronizer from './syncronizer';
import PlayerRenderer from './renderers/player_renderer';
import Vector from '../vector'; 
import Input from './input';
import Movement from './movement';
import Collider from './collider';
import Hitpoint from './hitpoint';
import Camera from './camera';
import Circle from './circle';


const createPlayer = ({ id, owned, position }) => {
  const player = new GameObject(id, 1);
  const transform = new Transform(Vector.fromPOJO(position));
  player.addComponent(transform);
  new TransformSyncronizer(id + '0', transform, owned);
  const hitpoint = new Hitpoint(100);
  player.addComponent(hitpoint);
  new Syncronizer(id+'1', hitpoint);
  player.addComponent(new PlayerRenderer());
  player.addComponent(new Movement());
  player.addComponent(new Collider(new Circle(50)));

  if (owned) {
    player.addComponent(new Input());
    player.addComponent(new Camera());
    
  }
  return player;
};

export default createPlayer;
