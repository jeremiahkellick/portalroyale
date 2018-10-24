import GameObject from './game_object';
import Syncronizer from './syncronizer';
import Transform from './transform';
import TreeRenderer from './renderers/tree_renderer';
import Collider from './collider';
import Hitpoint from './hitpoint';
import Vector from '../vector';
import Circle from './circle';

const createTree = ({ id, position }) => {
  const tree = new GameObject(id, 3);
  const transform = new Transform(Vector.fromPOJO(position));
  tree.addComponent(transform);
  const hitpoint = new Hitpoint(100);
  tree.addComponent(hitpoint);
  new Syncronizer(id+'1', hitpoint);
  tree.addComponent(new TreeRenderer());
  tree.addComponent(new Collider(new Circle(30)));
  return tree;
};

export default createTree;
