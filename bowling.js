const BLANK = '_';
const STRIKE = 10;
const SPARE = -1;

export const scoreGame = (inputStream, verbose) => {

  let frameCounter;
  let ballCounter;
  let firstBall;
  let secondBall;
  let thirdBall = 0;
  let score;
  let scoreCard;
  let frames;

  // Custom data structure, that holds frame and value if extra balls to be credited 
  // ie extra.two = [frame_index, current_value] means frame_index 
  // should be credited with next 2 ball values

  let extra = {
    one:[], 
    two:[],
  };

  const lookup = {
    '-': 0,
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    'X': 10,
    '/': -1,
  }


  frames = new Array(10);
  frames.fill(BLANK);

  frameCounter = 0;
  ballCounter = 0;

  /************************* FIRST 9 FRAMES ******************************/ 
  while (frameCounter < 9) {

    firstBall = lookup[inputStream[ballCounter++]];

    if (firstBall === STRIKE) { 
      shiftOne(frames, extra, 10);
      extra.two = [frameCounter, 10];
      frameCounter++
    } else {
      shiftOne(frames, extra, firstBall);
      secondBall = lookup[inputStream[ballCounter++]];

      if (secondBall === SPARE) {
        shiftOne(frames, extra, 10 - firstBall);
        extra.one = [frameCounter, 10];
      } else {
        shiftOne(frames, extra, secondBall);
        frames[frameCounter] = firstBall + secondBall;
      }

    frameCounter++;
    }

    // report score card as reportable at end of frame
    if (verbose) {
      console.log('after frame', frameCounter, 'score card is:', makeScoreCard(frames));
    }

  }

  /************************* LAST FRAME ******************************/ 

  firstBall = lookup[inputStream[ballCounter++]];
  shiftOne(frames, extra, firstBall);

  secondBall = lookup[inputStream[ballCounter++]];

  if (secondBall !== SPARE) {
    shiftOne(frames, extra, secondBall);
  } else {
    shiftOne(frames, extra, 10 - firstBall);
  }

  // Third Ball Check
  if (secondBall === SPARE || firstBall === STRIKE) {
    thirdBall = lookup[inputStream[ballCounter++]];
  }

  if (secondBall === SPARE) {
    frames[frameCounter] = 10 + thirdBall
  } else {
    frames[frameCounter] = firstBall + secondBall + thirdBall;
  }

  frameCounter++;

  score = frames.reduce((last, current) => current !== BLANK ? last + current : last, 0);

  // final scorecard
  if (verbose) { 
    console.log('after frame', frameCounter, 'score card is:', makeScoreCard(frames));
  }

  return score;
}


const shiftOne = (frames, extra, ballValue) => {
  let FRAME = 0;
  let VALUE = 1;

  if (extra.one.length > 0) {
    frames[extra.one[FRAME]] = extra.one[VALUE] + ballValue;
  }
  if (extra.two.length > 0) {
    extra.one = [extra.two[FRAME], extra.two[VALUE] + ballValue];
  } else {
    extra.one = [];
  }

  extra.two = [];
  
}

const makeScoreCard = (frames) => {
  let score = 0;

  return (
    frames.map(current => {
      if(current !== BLANK) {
        score += current;
        return score;
      } else {
        return BLANK;
      }
    })
  );
}