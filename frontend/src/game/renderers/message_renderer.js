import Renderer from './renderer';
import Message from '../game_components/message';

class MessageRenderer extends Renderer {

  draw(ctx) {
    const messages = Message.message.messages;
    const canvas = document.getElementById("canvas");

    messages.forEach( message => {
      ctx.fillStyle = '#61726177';
      this.drawRoundedRect(
        ctx,
        canvas.width - 260,
        10,
        100,
        100,
        10
      )
      ctx.fill();
      ctx.fillStyle = 'white';

      ctx.fillText( message, canvas.width - 260, 44);
    });

  }

}

export default MessageRenderer;
