
/* Your sketch goes here */
/* Math.random() -> mathRand() = R.D() */
/* RI() -> random Integer */
/* R.I() -> random Integer */
/* Globals: M = Math, W = Window, D = Document */


function setup(){
  createCanvas(windowWidth, windowHeight)
  noStroke()
  window.$functionAttribute = {
    "trait1": mathRand() * 10,
    "trait2": mathRand() * 100,
    "trait3": mathRand() * 1000
  }
  frameRate(120)
  console.log(window.$functionAttribute)
}

function draw(){
  background(220, .08)
  fill(RI(255), RI(255), 0)
  ellipse(RI(width), R.I(height), 40, 40)
  //console.log(FN.N(0, 1));
}
