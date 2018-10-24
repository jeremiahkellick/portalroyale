import GameObject from './game_object';
import Transform from './transform';
import TreeRenderer from './renderers/tree_renderer';
import Collider from './collider';
import Vector from '../vector';
import Circle from './circle';

const createTree = ({ id, position }) => {
  const tree = new GameObject(id, 3);
  const transform = new Transform(Vector.fromPOJO(position));
  tree.addComponent(transform);
  tree.addComponent(new TreeRenderer());
  tree.addComponent(new Collider(new Circle(30)));
  return tree;
};

export default createTree;
