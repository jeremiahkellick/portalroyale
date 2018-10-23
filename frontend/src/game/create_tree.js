import GameObject from './game_object';
import Transform from './transform';
import TreeRenderer from './renderers/tree_renderer';
import Vector from '../vector'; 

const createTree = ({ position }) => {
  const tree = new GameObject();
  const transform = new Transform(Vector.fromPOJO(position));
  tree.addComponent(transform);
  tree.addComponent(new TreeRenderer());
  return tree;
};

export default createTree;
