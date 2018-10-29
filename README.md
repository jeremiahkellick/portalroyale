# Portal Royale

_A multi-player battle royale shooter game_

<img src="./frontend/public/images/icon.png" />

[Live Site](http://portalroyale.herokuapp.com/#/)

## Background and Overview

Portal Royale is a multi-player battle royale shooter game that is modeled after [surviv.io](http://surviv.io/) - with a twist. In Portal Royale, players are free to use portals that are spawned on the map, which will randomly teleport a player to another location on the map. Will the there be dangers or safety beyond the portal? There's only one way to find out...

## Technologies


## Game Demo

### Portals
<img src="./docs/gifs/portal.gif"/>

### Exploding Barrels
<img src="./docs/gifs/exploding_barrel.gif"/>

### Medkit
<img src="./docs/gifs/medkit.gif"/>

## Technologies Used

## Implementation Details
* Game state synchronization via websockets
* Collision detection and resolution
* Canvas drawing with moving camera

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

##

## Group Members
* [Jeremiah](https://github.com/jeremiahkellick)
* [Danny](https://github.com/OnlyChobo)
* [Jingna](https://github.com/jli57)
* [AJ](https://github.com/ajgosling)

