import GameObject from './game_object';
import Transform from './transform';
import BulletRenderer from './renderers/bullet_renderer';
import Collider from './collider';
import Circle from './circle';
import BulletMovement from './bullet_movement'; 
import Vector from '../vector';

const createBullet = ({id, position, speed, rotation, owned}) => {
  const bullet = new GameObject(id, 2);
  const transform = new Transform(  position );
  bullet.addComponent(transform);
  bullet.addComponent(new Collider(new Circle(5)));
  bullet.addComponent(new BulletRenderer(speed, rotation));
  bullet.addComponent(new BulletMovement(400, speed) );
  return bullet;
};

export default createBullet;
