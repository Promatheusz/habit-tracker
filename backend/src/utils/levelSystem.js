const LEVEL_THRESHOLDS = {
  1: 0,
  2: 100,
  3: 250,
  4: 500,
  5: 1000,
  6: 1500,
  7: 2000,
  8: 2500,
  9: 3000,
  10: 3500,
};

const DIFFICULTY_XP = {
  easy: 10,
  medium: 25,
  hard: 50,
};

function getLevelForXP(totalXP) {
  let level = 1;

  Object.entries(LEVEL_THRESHOLDS).forEach(([candidateLevel, threshold]) => {
    if (totalXP >= threshold) {
      level = Number(candidateLevel);
    }
  });

  return level;
}

function getXPForLevel(level) {
  return LEVEL_THRESHOLDS[level] ?? LEVEL_THRESHOLDS[10];
}

function getXPForNextLevel(level) {
  return LEVEL_THRESHOLDS[level + 1] ?? LEVEL_THRESHOLDS[10];
}

function getXPRewardForDifficulty(difficulty) {
  return DIFFICULTY_XP[difficulty] ?? DIFFICULTY_XP.easy;
}

function calculateLevelAndXP(currentXP, xpToAdd) {
  const xp = currentXP + xpToAdd;
  const level = getLevelForXP(xp);

  return {
    level,
    xp,
    leveledUp: level > getLevelForXP(currentXP),
  };
}

module.exports = {
  DIFFICULTY_XP,
  LEVEL_THRESHOLDS,
  calculateLevelAndXP,
  getLevelForXP,
  getXPForLevel,
  getXPForNextLevel,
  getXPRewardForDifficulty,
};
