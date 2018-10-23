import GameObject from './game_object';
import Transform from './transform';
import TreeRenderer from './renderers/tree_renderer';
import Collider from './collider';
import Vector from '../vector';
import Circle from './circle';

const createTree = ({map}) => {
  const tree = new GameObject();
  const transform = new Transform( Vector.random(map) );
  tree.addComponent(transform);
  tree.addComponent(new TreeRenderer());
  tree.addComponent(new Collider(new Circle(50)));
  return tree;
};

export default createTree;
