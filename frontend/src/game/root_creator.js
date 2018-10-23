import createPlayer from './create_player';

const rootCreator = options => {
  switch (options.type) {
    case 'player':
      return createPlayer(options);
    default:
      return null;
  }
}

export default rootCreator;
