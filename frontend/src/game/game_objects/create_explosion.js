import GameObject from './game_object';
import Transform from '../game_components/transform';
import ExplosionRenderer from '../renderers/explosion_renderer';
import Collider from '../game_components/collider';
import Vector from '../vector';
import Circle from '../shapes/circle';
import ExplosionMovement from '../game_components/explosion_movement';

const createExplosion = ({ id, position, owned }) => {
  const explosion = new GameObject(id, 9);
  const transform = new Transform(Vector.fromPOJO(position));
  explosion.addComponent(transform);
  explosion.addComponent(new ExplosionMovement(10, 150, owned));
  explosion.addComponent(new ExplosionRenderer());
  explosion.addComponent(new Collider(new Circle(30)));

  const sound = new Audio("./sounds/explosion.mp3");
  sound.play();

  return explosion;
};

export default createExplosion;
