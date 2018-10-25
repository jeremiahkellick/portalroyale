import GameObject from './game_object';
import Transform from '../game_components/transform';
import TransformSyncronizer from '../transform_syncronizer';
import Syncronizer from '../syncronizer';
import CircleRenderer from '../renderers/circle_renderer';
import HitpointRenderer from '../renderers/hitpoint_renderer';
import Vector from '../vector';
import Input from '../game_components/input';
import Movement from '../game_components/movement';
import Camera from '../game_components/camera';
import Shoot from '../game_components/shoot';
import Collider from '../game_components/collider';
import Hitpoint from '../game_components/hitpoint';
import Circle from '../shapes/circle';


const createPlayer = ({ id, owned, position }) => {
  const radius = 22;
  const player = new GameObject(id, 1);
  const transform = new Transform(Vector.fromPOJO(position));
  player.addComponent(transform);
  new TransformSyncronizer(id + '0', transform, owned);
  const hitpoint = new Hitpoint(100, owned);
  player.addComponent(hitpoint);
  new Syncronizer(id+'1', hitpoint);
  player.addComponent(new CircleRenderer(radius, '#f6cb88'));
  player.addComponent(new Movement());
  player.addComponent(new Collider(new Circle(radius), 'player'));

  if (owned) {
    player.addComponent(new Input());
    player.addComponent(new Shoot());
    player.addComponent(new Camera());
    player.addComponent(new HitpointRenderer());
  }
  return player;
};

export default createPlayer;
