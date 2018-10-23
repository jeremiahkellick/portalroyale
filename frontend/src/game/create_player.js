import GameObject from './game_object';
import Transform from './transform';
import TransformSyncronizer from './transform_syncronizer';
import PlayerRenderer from './renderers/player_renderer';
import Vector from '../vector'; 
import Input from './input';
import Movement from './movement';
import Collider from './collider';
import Camera from './camera';
import Circle from './circle';


const createPlayer = ({ id, owned, map }) => {
  const player = new GameObject(id);
  const transform = new Transform( Vector.random(map) );
  player.addComponent(transform);
  new TransformSyncronizer(id + '0', transform, owned);
  player.addComponent(new PlayerRenderer());
  if (owned) player.addComponent(new Input());
  player.addComponent(new Movement());
  player.addComponent(new Collider(new Circle(50)));
  player.addComponent(new Camera()); 

  if ( owned  ) {
    window.playerTransform = player.getComponent(Transform);  
  }
  return player;
};

export default createPlayer;
