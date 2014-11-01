React client for the Escape from /dev/null competition.

# Installation

- duplicate `session-key.example.js` into `session-key.js` and add your key
- `npm install`
- `watchify src/game.jsx -o build/bundle.js`
- `open index.html`

# Keyboard Shorcuts

* `up/down/left/right` - move straight
* `w/a/s/d` - dig
* `i/o/k/l` - move diagonally
* `z/x` - up/down staircase
* `p` - planeshift

## Features

- [x] show inventory
- [x] drop
- [x] use
- [x] dig
- [x] unwield
- [x] repair inventory items
- [x] clicking on item gives me details
- [x] allocate points
- [x] when a monster is killed, issue a notification
- [x] level up
- [x] highscores
- [x] planeshift

## ~~Bugs~~ Awesome Features

- the map is reversed... but the UI fits in one screen :-P
