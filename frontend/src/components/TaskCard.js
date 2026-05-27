function TaskCard({ task, onComplete }) {
  return (
    <div className="bg-gray-900 p-5 rounded-2xl flex justify-between items-center">
      <div>
        <h3 className="text-white text-lg font-bold">{task.title}</h3>

        <p className="text-yellow-400">+{task.xp} XP</p>
      </div>

      <button
        disabled={task.completed}
        onClick={() => onComplete(task.id)}
        className={`px-4 py-2 rounded-xl text-white ${
          task.completed ? 'bg-gray-700' : 'bg-green-500 hover:bg-green-600'
        }`}
      >
        {task.completed ? 'Done' : 'Complete'}
      </button>
    </div>
  );
}

export default TaskCard;
