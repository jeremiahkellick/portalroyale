import GameObject from './game_object';
import Transform from './transform';
import TransformSyncronizer from './transform_syncronizer';
import PlayerRenderer from './renderers/player_renderer';
import Vector from '../vector'; 

const createPlayer = ({ id, owned, map }) => {
  const player = new GameObject();
  const transform = new Transform( Vector.random(map) );
  player.addComponent(transform);
  new TransformSyncronizer(id + '0', transform, owned);
  player.addComponent(new PlayerRenderer());
  return player;
};

export default createPlayer;
