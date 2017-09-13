// determine basic structure of a crystal
// draw test shapes
//   - outline circle
//   - "spoke" lines

function setup() {
  createCanvas(500, 500, SVG)
  noLoop()
  angleMode(DEGREES)
  rectMode(CENTER)
}

function draw() {
  background('teal')
  fill(0)
  push()
    translate(width/2, height/2)
    rotate(45)
    rect(0, 0, 25, 25)
  pop()
  fill('red')
  rect(0, 0, 25, 25)
}
