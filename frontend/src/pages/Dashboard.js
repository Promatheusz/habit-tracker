import { useState } from 'react';

import Layout from '../components/Layout';
import XPBar from '../components/XPBar';
import TaskCard from '../components/TaskCard';

import { player, tasks } from '../data/mockData';

function Dashboard() {
  const [playerData, setPlayerData] = useState(player);
  const [taskList, setTaskList] = useState(tasks);

  function completeTask(id) {
    const selectedTask = taskList.find((task) => task.id === id);

    if (!selectedTask || selectedTask.completed) return;

    const updatedTasks = taskList.map((task) =>
      task.id === id ? { ...task, completed: true } : task,
    );

    let newXP = playerData.xp + selectedTask.xp;

    let newLevel = playerData.level;
    let newMaxXP = playerData.maxXP;

    if (newXP >= playerData.maxXP) {
      newXP = newXP - playerData.maxXP;
      newLevel += 1;
      newMaxXP += 50;
    }

    setPlayerData({
      ...playerData,
      xp: newXP,
      level: newLevel,
      maxXP: newMaxXP,
    });

    setTaskList(updatedTasks);
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl text-white font-bold mb-2">
            Welcome back, {playerData.username} ⚔️
          </h1>

          <p className="text-gray-400">Complete habits and gain XP.</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl">
          <h2 className="text-white text-2xl font-bold mb-4">Experience Progress</h2>

          <XPBar currentXP={playerData.xp} maxXP={playerData.maxXP} level={playerData.level} />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-900 p-6 rounded-2xl">
            <h3 className="text-white text-xl font-bold mb-2">Daily Streak</h3>

            <p className="text-yellow-400 text-3xl">🔥 {playerData.streak} Days</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl">
            <h3 className="text-white text-xl font-bold mb-2">Current Level</h3>

            <p className="text-green-400 text-3xl">{playerData.level}</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl">
            <h3 className="text-white text-xl font-bold mb-2">Remaining XP</h3>

            <p className="text-blue-400 text-3xl">{playerData.maxXP - playerData.xp}</p>
          </div>
        </div>

        <div>
          <h2 className="text-white text-3xl font-bold mb-4">Daily Tasks</h2>

          <div className="space-y-4">
            {taskList.map((task) => (
              <TaskCard key={task.id} task={task} onComplete={completeTask} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
