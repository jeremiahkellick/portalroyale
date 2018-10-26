import GameObject from './game_object';
import Syncronizer from '../syncronizer';
import Transform from '../game_components/transform';
import MedKitRenderer from '../renderers/med_kit_renderer';
import Vector from '../vector';
import Circle from '../shapes/circle';
import Item from '../game_components/item';


const createMedKit = ({ id, position }) => {
  const radius = 24;
  const medKit = new GameObject(id, 7);
  const transform = new Transform(Vector.fromPOJO(position));
  medKit.addComponent(transform);
  medKit.addComponent(new MedKitRenderer());
  const item = new Item(new Circle(radius));
  medKit.addComponent(item);
  new Syncronizer(id+'1', item);
  return medKit;
};

export default createMedKit;
