import GameObject from './game_object';
import Transform from './transform';
import BulletRenderer from './renderers/bullet_renderer';
import Vector from '../vector';
import Collider from './collider';
import Circle from './circle';

const createBullet = ({id, owned}) => {
  const bullet = new GameObject(id, 2);
  const transform = new Transform( new Vector(50, 50 ) );
  bullet.addComponent(transform);
  bullet.addComponent(new Collider(new Circle(1)));
  bullet.addComponent(new BulletRenderer());
  return bullet;
};

export default createBullet;
