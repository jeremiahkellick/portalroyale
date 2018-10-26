import GameObject from './game_object';
import Syncronizer from '../syncronizer';
import Transform from '../game_components/transform';
import ExplosionRenderer from '../renderers/explosion_renderer';
import Collider from '../game_components/collider';
import Hitpoint from '../game_components/hitpoint';
import Vector from '../vector';
import Circle from '../shapes/circle';

const createExplosion = ({ id, position, health }) => {
  const explosion = new GameObject(id, 9);
  const transform = new Transform(Vector.fromPOJO(position));
  explosion.addComponent(transform);
  const hitpoint = new Hitpoint(health);
  explosion.addComponent(hitpoint);
  new Syncronizer(id+'1', hitpoint);
  explosion.addComponent(new ExplosionRenderer());
  explosion.addComponent(new Collider(new Circle(30)));
  return explosion;
};

export default createExplosion;
