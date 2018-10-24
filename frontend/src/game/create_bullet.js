import GameObject from './game_object';
import Transform from './transform';
import BulletRenderer from './renderers/bullet_renderer';
import Collider from './collider';
import Circle from './circle';
import BulletMovement from './bullet_movement';

<<<<<<< HEAD
const createBullet = ({id, position, speed, rotation, owned}) => {
=======
const createBullet = ({ id, position, directionVector, owned }) => {
>>>>>>> master
  const bullet = new GameObject(id, 2);
  const transform = new Transform(  position );
  bullet.addComponent(transform);
  bullet.addComponent(new Collider(new Circle(5)));
<<<<<<< HEAD
  bullet.addComponent(new BulletRenderer(speed, rotation));
  bullet.addComponent(new BulletMovement(400, speed) );
=======
  bullet.addComponent(new BulletRenderer());
  bullet.addComponent(
    new BulletMovement(1200, directionVector.normalized().times(20))
  );
>>>>>>> master
  return bullet;
};

export default createBullet;
