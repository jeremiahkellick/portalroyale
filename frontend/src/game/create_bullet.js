import GameObject from './game_object';
import Transform from './transform';
import TransformSyncronizer from './transform_syncronizer';
import BulletRenderer from './renderers/bullet_renderer';
import Vector from '../vector'; 
import Movement from './movement';

const createBullet = ({id, owned}) => {
  const bullet = new GameObject(id, 2);
  const transform = new Transform( new Vector(50, 50 ) );
  bullet.addComponent(transform);
  new TransformSyncronizer(id + '0', transform, owned);
  bullet.addComponent(new BulletRenderer());
  bullet.addComponent(new Movement()); 
  return bullet;
};

export default createBullet;
