React client for the [Escape from /dev/null](http://palcu.blogspot.com/2014/11/google-escape-from-devnull.html) competition. It saves all the level
information in `localStorage`, so if you close your browser, you still have a
map and where are monsters.

![screenshot of the game](http://3.bp.blogspot.com/-XG86RaTlPLs/VFVa090DLOI/AAAAAAAAMDA/ZUPE7Aof_Fw/s1600/Screen%2BShot%2B2014-11-02%2Bat%2B00.01.40.png)

# Installation

- duplicate `session-key.example.js` into `session-key.js` and add your key
- `npm install`
- `npm install -g watchify`
- `watchify src/all-that-is.jsx -o build/bundle.js`
- `open index.html`

# Keyboard Shorcuts

* `up/down/left/right` - move straight
* `w/a/s/d` - dig
* `i/o/k/l` - move diagonally
* `z/x` - up/down staircase
* `p` - planeshift
* `g` - get an item

## Features

- [x] show inventory
- [x] drop
- [x] use
- [x] dig
- [x] unwield
- [x] repair inventory items
- [x] clicking on a cell in the map gives me details about characters, the cell type and items there
- [x] allocate points by clicking on a skill
- [x] when a monster is killed, show a notification in the console
- [x] show a level up notification if I have level points
- [x] highscores by issuing `getHighScores` in the console
- [x] planeshift

## ~~Bugs~~ Awesome Features

- the map is reversed... but the UI fits in one screen :-P
