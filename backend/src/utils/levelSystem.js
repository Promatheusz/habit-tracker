/**
 * Oblicza próg punktów doświadczenia potrzebny do awansu.
 *
 * @param {number} level - Obecny poziom gracza.
 * @returns {number} Wymagane punkty doświadczenia do kolejnego poziomu.
 */
function getXPForNextLevel(level) {
  return level * 100;
}

/**
 * Dodaje doświadczenie i obsługuje awanse.
 *
 * @param {number} currentLevel - Obecny poziom.
 * @param {number} currentXP - Obecne punkty doświadczenia.
 * @param {number} xpToAdd - Doświadczenie do dodania.
 * @returns {{ level: number, xp: number, leveledUp: boolean }} Nowe parametry gracza.
 */
function calculateLevelAndXP(currentLevel, currentXP, xpToAdd) {
  let level = currentLevel;
  let xp = currentXP + xpToAdd;
  let leveledUp = false;

  while (xp >= getXPForNextLevel(level)) {
    xp -= getXPForNextLevel(level);
    level += 1;
    leveledUp = true;
  }

  return { level, xp, leveledUp };
}

module.exports = {
  getXPForNextLevel,
  calculateLevelAndXP,
};
