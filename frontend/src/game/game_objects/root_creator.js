import createPlayer from './create_player';
import createTree from './create_tree';
import createBullet from './create_bullet';

const rootCreator = options => {
  switch (options.type) {
    case 'player':
      return createPlayer(options);
    case 'tree':
      return createTree(options);
    case 'bullet':
      return createBullet(options);
    default:
      return null;
  }
}

export default rootCreator;
