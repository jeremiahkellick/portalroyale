import GameObject from './game_object';
import Syncronizer from './syncronizer';
import Transform from './transform';
import LootCrateRenderer from './renderers/loot_crate_renderer';
import Collider from './collider';
import Hitpoint from './hitpoint';
import Vector from '../vector';
import Rectangle from './rectangle';

const createLootCrate = ({ id, position }) => {
  const lootCrate = new GameObject(id, 6);
  const transform = new Transform(Vector.fromPOJO(position));
  lootCrate.addComponent(transform);
  const hitpoint = new Hitpoint(100);
  lootCrate.addComponent(hitpoint);
  new Syncronizer(id+'1', hitpoint);
  lootCrate.addComponent(new LootCrateRenderer());
  lootCrate.addComponent(new Collider(new Rectangle(100, 100)));
  return lootCrate;
};

export default createLootCrate;
