# Portfol.io

_A multi-player battle royale shooter game_

[Live Site](#)

## Background and Overview

Portfol.io is a multi-player battle royale shooter game that is modeled after [surviv.io](http://surviv.io/). 


## Functionality and MVP 

- [ ] Player vs player game
- [ ] Multiple game instances
- [ ] Invite players through a code
- [ ] User Authentication, guest players
- [ ] Leaderboard
- [ ] Player show/info page with stats (average damage, max damage, win %, kills)

### Bonus Features
- [ ] Randomized map generation
- [ ] Ammo drop / pickup / usage
- [ ] Loot boxes
- [ ] Consumable items (heal, grenade, tactical nuke, etc)

## Technologies and Technical Challenges
* Game state synchronization via websockets
* Collision detection and resolution
* Canvas drawing with moving camera

### Wireframes

* Architecture
<img src="./images/diagram.png">

* Server-Client Interaction
<img src="./images/server_client.png">

* Homepage
<img src="./images/homepage.png">

* Game
<img src="./images/game_canvas.png">

### Game Component Setup

* Game
  * gameObjects

* GameObject
  * Components

* Transform extends Component
  * Position
  * Rotation
  * pack() - create a POJO of data that needs to be synced
  * unpack(data) - takes the data POJO and updates instance variables accordingly

* Health extends Component
  * HP
  * Return { hp: this.hp }
  * This.hp = data.hp
  * pack()
  * unpack(data)


## Things Accomplished Over the Weekend 

* Project Skeleton
* User Authentication
* Wire Frames

## Group Members and Work Breakdown

**Jeremiah Kellick, AJ Gosling, Danny Xu, Jingna Li**

* Day 1 - Oct 22, 2018
  * Jeremiah: Implement Game skeleton
  * AJ: User Authentication
  * Jing: UI Frontend React Component setup
  * Danny: collision detection

* Day 2 - Oct 23, 2018		
  * Jeremiah: Game component set up 
  * AJ: User show page
  * Jing: UI Frontend React Component setup
  * Danny: collision detection

* Day 3 - Oct 24, 2018
  * Jeremiah: Game components
  * AJ: Hi-score page
  * Jing: Game components
  * Danny: collision detection

* Day 4 - Oct 25, 2018
  * Jeremiah: Game server-client setup
  * AJ: Invite code generation
  * Jing: UI Frontend React Component setup
  * Danny: Collision detection

* Day 5 - Oct 26, 2018
  * Jeremiah: Canvas Wrapper
  * AJ: Invite Code generation
  * Jing: Game Components
  * Danny: Map generation
  
* Day 6 - Oct 27, 2018
  * Jeremiah: Keymap 
  * AJ: User show page
  * Jing: UI
  * Danny: Map Panning

* Day 7 - Oct 28, 2018
  * Jeremiah: Game components
  * AJ: User show page
  * Jing: UI/UX
  * Danny: In game chat