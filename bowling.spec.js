import { expect } from 'chai';
import { scoreGame } from './bowling.js';

describe("scoreGame() of bowling.js", () => {

  it("should return 300 for prefect game", () =>
    expect(scoreGame('XXXXXXXXXXXX')).to.equal(300)
  );

  it("should return 90 for 9-9-9-9-9-9-9-9-9-9-", () =>
    expect(scoreGame('9-9-9-9-9-9-9-9-9-9-')).to.equal(90)
  );

  it("should return 150 for 5/5/5/5/5/5/5/5/5/5/5", () =>
    expect(scoreGame('5/5/5/5/5/5/5/5/5/5/5')).to.equal(150)
  );

  it("should return 135 for 5/5/5/5/X--5/5/5/5/5", () =>
    expect(scoreGame('5/5/5/5/X--5/5/5/5/5', true)).to.equal(135)
  );

  it("should return 145 for 5/X5/5/X--5/5/5/5/5", () =>
    expect(scoreGame('5/X5/5/X--5/5/5/5/5', true)).to.equal(145)
  );
});