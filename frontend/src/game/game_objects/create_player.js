import GameObject from './game_object';
import Transform from '../game_components/transform';
import TransformSyncronizer from '../transform_syncronizer';
import Syncronizer from '../syncronizer';
import CircleRenderer from '../renderers/circle_renderer';
import HitpointRenderer from '../renderers/hitpoint_renderer';
import CountdownRenderer from '../renderers/countdown_renderer';
import Vector from '../vector';
import Input from '../game_components/input';
import Movement from '../game_components/movement';
import Camera from '../game_components/camera';
import Shoot from '../game_components/shoot';
import Collider from '../game_components/collider';
import Pickup from '../game_components/pickup';
import Hitpoint from '../game_components/hitpoint';
import Speed from '../game_components/speed';
import Inventory from '../game_components/inventory';
import Circle from '../shapes/circle';
import NameRenderer from '../renderers/name_renderer';
import GameOver from '../game_components/game_over';
import Count from '../game_components/count';
import VictoryChecker from '../game_components/victory_checker';

const createPlayer = ({ id, owned, position, health, name }) => {
  const radius = 22;
  const player = new GameObject(id);
  const transform = new Transform(Vector.fromPOJO(position));
  player.addComponent(transform);
  new TransformSyncronizer(id + '0', transform, owned);
  const hitpoint = new Hitpoint(health);
  player.addComponent(hitpoint);
  new Syncronizer(id+'1', hitpoint);
  player.addComponent(new CircleRenderer(radius, '#f6cb88', 1));
  player.addComponent(new Movement());
  player.addComponent(new Collider(new Circle(radius), 'player'));
  player.addComponent(new Count('players'));

  if (owned) {
    player.addComponent(new Input());
    player.addComponent(new Shoot());
    player.addComponent(new Pickup());
    player.addComponent(new Inventory());
    player.addComponent(new Speed());
    player.addComponent(new Camera());
    player.addComponent(new HitpointRenderer(10));
    player.addComponent(new CountdownRenderer());
    player.addComponent(new GameOver());
    player.addComponent(new VictoryChecker());
  } else {
    player.addComponent(new NameRenderer(name, 2));
  }

  return player;
};

export default createPlayer;
