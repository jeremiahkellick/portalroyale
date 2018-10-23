import GameObject from './game_object';
import Transform from './transform';
import TransformSyncronizer from './transform_syncronizer';
import Renderer from './renderer';

const createPlayer = ({ id, owned }) => {
  const player = new GameObject();
  const transform = new Transform();
  player.addComponent(transform);
  new TransformSyncronizer(id + '0', transform, owned);
  player.addComponent(new Renderer());
  return player;
};

export default createPlayer;
