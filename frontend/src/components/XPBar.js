function XPBar({ currentXP, maxXP, level }) {
  const percentage = maxXP > 0 ? Math.min((currentXP / maxXP) * 100, 100) : 0;

  return (
    <div>
      <div className="flex justify-between mb-2 text-gray-300">
        <span>Level {level}</span>
        <span>
          {currentXP}/{maxXP} XP
        </span>
      </div>

      <div className="w-full bg-gray-700 rounded-full h-6 overflow-hidden">
        <div
          className="bg-yellow-400 h-6 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default XPBar;
