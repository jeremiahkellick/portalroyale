import GameObject from './game_object';
import Transform from '../game_components/transform';
import PortalRenderer from '../renderers/portal_renderer';
import Vector from '../vector';
import PortalMovement from '../game_components/portal_movement';

const createPortal = ({ id, position1, position2 }) => {
  const portal = new GameObject(id);
  portal.type = "portal";
  const transform1 = new Transform(Vector.fromPOJO(position1));
  const transform2 = new Transform(Vector.fromPOJO(position2));
  portal.addComponent(transform1);
  portal.addComponent(transform2);
  portal.addComponent(new PortalMovement(60));
  portal.addComponent(new PortalRenderer(0));
  return portal;
};

export default createPortal;
