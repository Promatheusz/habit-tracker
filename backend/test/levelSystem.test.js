const assert = require('assert');
const test = require('node:test');

const {
  calculateLevelAndXP,
  getLevelForXP,
  getXPRewardForDifficulty,
} = require('../src/utils/levelSystem');

test('maps difficulty to documented XP rewards', () => {
  assert.strictEqual(getXPRewardForDifficulty('easy'), 10);
  assert.strictEqual(getXPRewardForDifficulty('medium'), 25);
  assert.strictEqual(getXPRewardForDifficulty('hard'), 50);
});

test('calculates level from total XP thresholds', () => {
  assert.strictEqual(getLevelForXP(0), 1);
  assert.strictEqual(getLevelForXP(100), 2);
  assert.strictEqual(getLevelForXP(250), 3);
  assert.strictEqual(getLevelForXP(500), 4);
  assert.strictEqual(getLevelForXP(1000), 5);
});

test('adds XP without rolling total XP back to zero', () => {
  const result = calculateLevelAndXP(95, 10);

  assert.strictEqual(result.xp, 105);
  assert.strictEqual(result.level, 2);
  assert.strictEqual(result.leveledUp, true);
});
