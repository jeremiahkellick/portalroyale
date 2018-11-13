import GameObject from './game_object';
import Transform from '../game_components/transform';
import BulletRenderer from '../renderers/bullet_renderer';
import Collider from '../game_components/collider';
import Circle from '../shapes/circle';
import BulletMovement from '../game_components/bullet_movement';
import Vector from '../vector';

const createBullet = ({ id, position, directionVector, rotation, owned }) => {
  position = Vector.fromPOJO(position);
  directionVector = Vector.fromPOJO(directionVector);
  const bullet = new GameObject(id);
  const transform = new Transform(  position );
  bullet.addComponent(transform);
  bullet.addComponent(new Collider(new Circle(5), 1, 'bullet'));
  bullet.addComponent(new BulletRenderer(rotation, 1));
  bullet.addComponent(
    new BulletMovement(1800, directionVector.normalized().times(2000), owned)
  );
  return bullet;
};

export default createBullet;
