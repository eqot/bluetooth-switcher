import { P5tCube } from 'p5.toio';
import { P5tId } from 'p5.toio/src/p5tId';

let cube;

window.setup = async () => {
  createCanvas(windowWidth, windowHeight);

  cube = await P5tCube.connectNewP5tCube();
  cube?.turnLightOn('white');
};

window.draw = () => {
  fill(234, 31, 81);
  noStroke();
  rect(50, 50, 250, 250);
  fill(255);
  textStyle(BOLD);
  textSize(140);
  text('p5*', 60, 250);

  if (!cube) {
    return;
  }

  const color = P5tId.ColorTileMat.getTileColor(cube.x, cube.y);
  if (color) {
    console.log(color);

    background(color);
  }
};
