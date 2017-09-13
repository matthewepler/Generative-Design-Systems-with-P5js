

const CRYSTAL_SIZE = 500
const SIDES = 6
let PALETTE = []

function setup() {
  createCanvas(530, 530, SVG)

  PALETTE = [
    color(255, 52, 154), // pink
    color(4, 0, 152) // blue
  ]

  noLoop()
  angleMode(DEGREES)
  rectMode(CENTER)
}

function draw() {
  testLines()
}

function testLines () {
  const rando = random(1)
  let numShapes
  if (rando > 0.5) {
    numShapes = SIDES
  } else {
    numShapes = SIDES * 2
  }

  const rando2 = floor(random(0, PALETTE.length))
  const strokeColor = PALETTE[rando2]
  console.log(rando2)


  noFill()
  stroke(PALETTE[0])
  push()
    translate(width/2, height/2)
    ellipse(0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE)
    
    stroke(strokeColor)
    const angle = 360 / numShapes
    for (let i = 0; i < numShapes; i++) {
      line(0, 0, 0, CRYSTAL_SIZE / 2)  
      rotate(angle)
    }
  pop()
}
