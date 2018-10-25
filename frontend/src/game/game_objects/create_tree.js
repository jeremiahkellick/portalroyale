import GameObject from './game_object';
import Syncronizer from '../syncronizer';
import Transform from '../game_components/transform';
import TreeRenderer from '../renderers/tree_renderer';
import Collider from '../game_components/collider';
import Hitpoint from '../game_components/hitpoint';
import Vector from '../vector';
import Circle from '../shapes/circle';

const createTree = ({ id, position, health }) => {
  const tree = new GameObject(id, 3);
  const transform = new Transform(Vector.fromPOJO(position));
  tree.addComponent(transform);
  const hitpoint = new Hitpoint(health);
  tree.addComponent(hitpoint);
  new Syncronizer(id+'1', hitpoint);
  tree.addComponent(new TreeRenderer());
  tree.addComponent(new Collider(new Circle(30), 'obstacle'));
  return tree;
};

export default createTree;
