function TaskCard({ task, onComplete }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-gray-900 p-5">
      <div>
        <h3 className="text-lg font-bold text-white">{task.name || task.title}</h3>

        <p className="text-yellow-400">+{task.xp_reward || task.xp} XP</p>
        <p className="text-sm capitalize text-gray-400">
          {task.difficulty || 'easy'} / {task.frequency || 'daily'}
        </p>
      </div>

      <button
        disabled={task.completed || task.completed_today}
        onClick={() => onComplete(task.id)}
        className={`rounded-lg px-4 py-2 text-white ${
          task.completed || task.completed_today ? 'bg-gray-700' : 'bg-green-500 hover:bg-green-600'
        }`}
      >
        {task.completed || task.completed_today ? 'Done' : 'Complete'}
      </button>
    </div>
  );
}

export default TaskCard;
