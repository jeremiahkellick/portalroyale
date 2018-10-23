import createPlayer from './create_player';
import createTree from './create_tree'; 

const rootCreator = options => {
  switch (options.type) {
    case 'player':
      return createPlayer(options);
    case 'tree': 
      return createTree(options); 
    default:
      return null;
  }
}

export default rootCreator;
