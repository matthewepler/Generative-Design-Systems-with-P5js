const state = {
  sides: SIDES,
  stepsOut: 8,
  thinStroke: 1,
  thickStroke: 3
}

const setState = (state) => {
  state.numShapes = state.sides,
  state.angle = 360 / state.numShapes,
  state.singleStep = (CRYSTAL_SIZE / 2) / state.stepsOut,
  state.layerColor = getRandomFromPalette()
  return state
}

const circles = (state) => {
  state.shapeSize = (CRYSTAL_SIZE / 2) * 0.93
  state.position = (CRYSTAL_SIZE / 2) - (state.shapeSize / 2)
  
  return ({
    name: 'circles',
    state,
    render: () => {
      noFill()
      stroke(state.layerColor)
      strokeWeight(1)
      push()
      //translate(width/2, height/2)
      for (let i = 0; i <= state.numShapes; i++) {
        ellipse(state.position, 0, state.shapeSize, state.shapeSize)
        rotate(state.angle)
      }
      pop()
    }
  })
}

const simpleLines = (state) => {
  state.numSteps = randomSelectTwo() ? state.stepsOut : int(state.stepsOut * 1.25)
  state.step = (CRYSTAL_SIZE / 2) / state.numSteps
  state.start = floor(random(0, state.numSteps))
  state.stop = floor(random(state.start, state.numSteps + 1))
  state.weight = randomSelectTwo() ? state.thinStroke : state.thickStroke
  state.numShapes = randomSelectTwo() ? state.sides : state.sides * 2
  state.angle = 360 / state.numShapes
  
  return ({
    name: 'Simple Lines',
    state,
    render: () => {
      noFill()
      stroke(state.layerColor)
      strokeWeight(state.weight)
      push()
        //translate(width/2, height/2)
        for (let i = 0; i < state.numShapes; i++) {
          line(state.start * state.step, 0, state.stop * state.step, 0)  
          rotate(state.angle)
        }
      pop()
    }
  })
}

const outlineShape = (state) => {
  state.weight = randomSelectTwo() ? state.thinStroke : state.thickStroke
  state.hexagonTrue = randomSelectTwo()

  return ({
    name: 'Outline Shape', 
    state,
    render: () => {
      stroke(state.layerColor)
      strokeWeight(state.weight)
      push()
      //translate(width/2, height/2)
      if (state.hexagonTrue) {
        hexagon(0, 0, CRYSTAL_SIZE / 2)
      } else {
        ellipse(0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE)
      }
      pop()
    }
  })
}

const dottedLines = (state) => {                           
  state.numShapes = randomSelectTwo() ? state.sides : state.sides * 2
  state.angle = 360 / state.numShapes
  state.shapeSize = 3
  state.centerOffset = state.singleStep

  return ({
    name: 'Dotted Lines',
    state,
    render: () => {
      fill(state.layerColor)
      noStroke()
      push()
      //translate(width / 2, height / 2)
      for(let i = 0; i <= state.numShapes; i++) {
        for(let x = state.centerOffset; x < CRYSTAL_SIZE / 2; x += state.singleStep) {
          rect(x, 0, state.shapeSize, state.shapeSize)
        }
        rotate(state.angle)
      }
      pop()
    }
  })
}

const centeredShape = (state) => {                     
  state.randomShape = random(1)
  state.shapeSize = floor(random(state.stepsOut / 2, state.stepsOut - 2)) * state.singleStep

  return ({
    name: 'Centered Shape',
    state,
    render: () => {
      fill(state.layerColor)
      noStroke()
      push()
     // translate(width / 2, height / 2)
      if (state.randomShape < 0.1) {
        rect(0, 0, state.shapeSize * 2, state.shapeSize * 2)
      } else if (state.randomShape >= 0.1 && state.randomShape < 0.6) {
        ellipse(0, 0, state.shapeSize * 2, state.shapeSize * 2)
      } else if (state.randomShape >= 0.6) {
        rotate(state.angle / 2) 
        hexagon(0, 0, state.shapeSize)
      }
      pop()
    }
  })
}

const ringOfShapes = (state) => {                    
  state.steps = floor(random(1, state.stepsOut))
  state.center = state.steps * state.singleStep
  state.randomShape = random(1)
  state.direction = randomSelectTwo() // used for triangle only
  state.fillColor = randomSelectTwo() ? state.layerColor : color(0, 1)
  state.weight = randomSelectTwo() ? state.thinStroke : state.thickStroke

  if (state.steps < state.stepsOut / 2) {
    state.radius = floor(random(1, state.steps)) * state.singleStep
  } else if (state.steps > state.stepsOut / 2) {
    state.radius = floor(random(1, state.stepsOut - state.steps)) * state.singleStep
  } else {
    state.radius = floor(random(1, (state.stepsOut / 2) + 1)) * state.singleStep
  }

  return ({
    name: 'Ring of Shapes',
    state,
    render: () => {
      stroke(state.layerColor)
      fill(state.fillColor)
      strokeWeight(state.weight)
      push()
      //translate(width / 2, height / 2)
      for (let i = 0; i < state.numShapes; i++) {
        if (state.randomShape < 0.33) {
          ellipse(0, state.center, state.radius, state.radius)
        } else if (state.randomShape >= 0.33 && state.randomShape < 0.66) {
          rect(0, state.center, state.radius, state.radius)
        } else if (state.randomShape >= 0.66) {
          myTriangle(state.center, state.radius, state.direction)
        }
        rotate(state.angle)
      }
      pop()
    }
  })
}

const steppedHexagons = (state) => {                 
  state.numSteps = randomSelectTwo() ? state.stepsOut : state.stepsOut * 1.25
  state.centerOffset = (CRYSTAL_SIZE / 2) * 0.15
  state.singleStep = ((CRYSTAL_SIZE / 2) - state.centerOffset) / state.numSteps
  state.weight = randomSelectTwo() ? state.thinStroke : state.thickStroke

  return ({
    name: 'Stepped Hexagons',
    state,
    render: () => {
      stroke(state.layerColor)
      noFill()
      strokeWeight(state.weight)
      push()
      //translate(width / 2, height / 2)
      rotate(state.angle / 2) 
      for (let i = 1; i < state.numSteps + 1; i++) {
        hexagon(0, 0, state.centerOffset + (i * state.singleStep))
      }
      pop()
    }
  })
}









