# Portfol.io

_A multi-player battle royale shooter game_

[Live Site](#)

## Background and Overview

Portfol.io is a multi-player battle royale shooter game that is modeled after [surviv.io](http://surviv.io/).


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


## Group Members
* [Jeremiah](https://github.com/jeremiahkellick)
* [Danny](https://github.com/OnlyChobo)
* [Jingna](https://github.com/jli57)
* [AJ](https://github.com/ajgosling)

