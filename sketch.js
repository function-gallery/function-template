
/* Your sketch goes here */
/* Math.random() -> mathRand() */
/* M = Math, W = Window, D = Document */

function setup(){
  createCanvas(windowWidth, windowHeight)
  noStroke()
}

window.draw = function(){
  background(220, .1)
  fill(255, 0, 0)
  ellipse(RI(0, width), RI(0, height), 20, 20)
  console.log(FN.N(0, 1));
}

window.$functionAttribute = {
  "trait1": mathRand() * 10,
  "trait2": mathRand() * 100,
  "trait3": mathRand() * 1000
}

console.log(window.$functionAttribute)
