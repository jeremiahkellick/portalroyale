import createPlayer from './create_player';
import createTree from './create_tree';
import createBullet from './create_bullet';
import createExplosiveCircle from './create_explosive_circle';
import createLootCrate from './create_loot_crate';
import createMedKit from './create_med_kit';
import createExplosion from './create_explosion';
import createportal from './create_portal';

const rootCreator = options => {
  switch (options.type) {
    case 'player':
      return createPlayer(options);
    case 'tree':
      return createTree(options);
    case 'bullet':
      return createBullet(options);
    case 'explosiveCircle':
      return createExplosiveCircle(options);
    case 'lootCrate':
      return createLootCrate(options);
    case 'medKit':
      return createMedKit(options);
    case 'explosion':
      return createExplosion(options);
    case 'portal':
      return createportal(options);
    default:
      return null;
  }
}

export default rootCreator;
