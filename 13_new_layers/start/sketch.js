const CRYSTAL_SIZE = 500
const SIDES = 6
let PALETTE = []

const layers = []

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
  let picker = random(1)
  if (picker > 0.3) {
    layers.push(new OutlineShape())
  }

  picker = random(1)
  if (picker > 0.3) {
    layers.push(new SimpleLines())
  }

  picker = random(1)
  if (picker > 0.3) {
    layers.push(new Circles())
  }

  layers.forEach(layer => {
    layer.render()
  })
}















