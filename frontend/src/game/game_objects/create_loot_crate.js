import GameObject from './game_object';
import Syncronizer from '../syncronizer';
import Transform from '../game_components/transform';
import LootCrateRenderer from '../renderers/loot_crate_renderer';
import Collider from '../game_components/collider';
import Hitpoint from '../game_components/hitpoint';
import Vector from '../vector';
import Rectangle from '../shapes/rectangle';

const createLootCrate = ({ id, position, health }) => {
  const lootCrate = new GameObject(id, 6);
  const transform = new Transform(Vector.fromPOJO(position));
  lootCrate.addComponent(transform);
  const hitpoint = new Hitpoint(health);
  lootCrate.addComponent(hitpoint);
  new Syncronizer(id+'1', hitpoint);
  lootCrate.addComponent(new LootCrateRenderer());
  lootCrate.addComponent(new Collider(new Rectangle(100, 100), 0.5, 'obstacle'));
  return lootCrate;
};

export default createLootCrate;
