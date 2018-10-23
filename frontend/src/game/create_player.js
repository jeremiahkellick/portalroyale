import GameObject from './game_object';
import Transform from './transform';
import TransformSyncronizer from './transform_syncronizer';
import Renderer from './renderer';
import Input from './input';
import Movement from './movement';

const createPlayer = ({ id, owned }) => {
  const player = new GameObject();
  const transform = new Transform();
  player.addComponent(transform);
  new TransformSyncronizer(id + '0', transform, owned);
  player.addComponent(new Renderer());
  if (owned) player.addComponent(new Input());
  player.addComponent(new Movement());
  return player;
};

export default createPlayer;
