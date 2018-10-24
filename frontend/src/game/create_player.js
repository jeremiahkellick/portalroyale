import GameObject from './game_object';
import Transform from './transform';
import TransformSyncronizer from './transform_syncronizer';
import Syncronizer from './syncronizer';
import CircleRenderer from './renderers/circle_renderer';
import Vector from '../vector'; 
import Input from './input';
import Movement from './movement';
import Camera from './camera'; 
import Shoot from './shoot';
import Collider from './collider';
import Hitpoint from './hitpoint';
import Circle from './circle';


const createPlayer = ({ id, owned, position }) => {
  const radius = 22;
  const player = new GameObject(id, 1);
  const transform = new Transform(Vector.fromPOJO(position));
  player.addComponent(transform);
  new TransformSyncronizer(id + '0', transform, owned);
  const hitpoint = new Hitpoint(100);
  player.addComponent(hitpoint);
  new Syncronizer(id+'1', hitpoint);
  player.addComponent(new CircleRenderer(22, '#fce5cd'));
  player.addComponent(new Movement());
  player.addComponent(new Collider(new Circle(radius)));

  if (owned) {
    player.addComponent(new Input());
    player.addComponent(new Shoot()); 
    player.addComponent(new Camera());
  }
  return player;
};

export default createPlayer;
