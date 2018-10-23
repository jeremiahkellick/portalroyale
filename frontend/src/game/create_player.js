import GameObject from './game_object';
import Transform from './transform';
import TransformSyncronizer from './transform_syncronizer';
import PlayerRenderer from './renderers/player_renderer';
import Vector from '../vector'; 
import Input from './input';
import Movement from './movement';
import Camera from './camera'; 

const createPlayer = ({ id, owned, position }) => {
  const player = new GameObject(id);
  const transform = new Transform(Vector.fromPOJO(position));
  player.addComponent(transform);
  new TransformSyncronizer(id + '0', transform, owned);
  player.addComponent(new PlayerRenderer());
  player.addComponent(new Movement());
  if (owned) {
    player.addComponent(new Input());
    player.addComponent(new Camera());
  }
  return player;
};

export default createPlayer;
