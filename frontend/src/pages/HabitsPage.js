import { useEffect, useState } from 'react';

import Layout from '../components/Layout';
import {
  completeHabit,
  createHabit,
  deleteHabit,
  getHabits,
  updateHabit,
} from '../services/api';

const emptyForm = {
  name: '',
  description: '',
  difficulty: 'easy',
  frequency: 'daily',
  target_days_of_week: '',
  target_days_per_week: '',
};

function HabitsPage() {
  const [habits, setHabits] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHabits();
  }, []);

  async function loadHabits() {
    try {
      setLoading(true);
      setHabits(await getHabits());
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function updateForm(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function startEdit(habit) {
    setEditingId(habit.id);
    setForm({
      name: habit.name,
      description: habit.description || '',
      difficulty: habit.difficulty,
      frequency: habit.frequency,
      target_days_of_week: habit.target_days_of_week || '',
      target_days_per_week: habit.target_days_per_week || '',
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (editingId) {
        await updateHabit(editingId, form);
        setMessage('Habit updated.');
      } else {
        await createHabit(form);
        setMessage('Habit created.');
      }
      setForm(emptyForm);
      setEditingId(null);
      await loadHabits();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleComplete(id) {
    try {
      await completeHabit(id);
      setMessage('Habit completed.');
      await loadHabits();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteHabit(id);
      setMessage('Habit deleted.');
      await loadHabits();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-white">Habits</h1>
          <p className="text-gray-400">Create routines and complete them for XP and currency.</p>
        </div>

        {error && <div className="rounded-lg bg-red-950 p-4 text-red-200">{error}</div>}
        {message && <div className="rounded-lg bg-green-950 p-4 text-green-200">{message}</div>}

        <form onSubmit={handleSubmit} className="grid gap-4 rounded-lg bg-gray-900 p-6 md:grid-cols-2">
          <input
            placeholder="Habit name"
            value={form.name}
            onChange={(event) => updateForm('name', event.target.value)}
            className="rounded-lg border border-gray-700 bg-gray-950 p-3 text-white"
          />
          <input
            placeholder="Description"
            value={form.description}
            onChange={(event) => updateForm('description', event.target.value)}
            className="rounded-lg border border-gray-700 bg-gray-950 p-3 text-white"
          />
          <select
            value={form.difficulty}
            onChange={(event) => updateForm('difficulty', event.target.value)}
            className="rounded-lg border border-gray-700 bg-gray-950 p-3 text-white"
          >
            <option value="easy">Easy - 10 XP</option>
            <option value="medium">Medium - 25 XP</option>
            <option value="hard">Hard - 50 XP</option>
          </select>
          <select
            value={form.frequency}
            onChange={(event) => updateForm('frequency', event.target.value)}
            className="rounded-lg border border-gray-700 bg-gray-950 p-3 text-white"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="one-time">One-time</option>
          </select>
          {form.frequency === 'weekly' && (
            <>
              <input
                placeholder="Target weekdays, e.g. 1,3,5"
                value={form.target_days_of_week}
                onChange={(event) => updateForm('target_days_of_week', event.target.value)}
                className="rounded-lg border border-gray-700 bg-gray-950 p-3 text-white"
              />
              <input
                placeholder="Target days per week"
                value={form.target_days_per_week}
                onChange={(event) => updateForm('target_days_per_week', event.target.value)}
                className="rounded-lg border border-gray-700 bg-gray-950 p-3 text-white"
              />
            </>
          )}
          <button className="rounded-lg bg-yellow-500 px-4 py-3 font-bold text-gray-950 hover:bg-yellow-400 md:col-span-2">
            {editingId ? 'Update Habit' : 'Add Habit'}
          </button>
        </form>

        {loading && <p className="text-gray-300">Loading habits...</p>}
        <div className="grid gap-4">
          {!loading && habits.length === 0 && (
            <div className="rounded-lg bg-gray-900 p-5 text-gray-300">No active habits yet.</div>
          )}
          {habits.map((habit) => (
            <div key={habit.id} className="rounded-lg bg-gray-900 p-5">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <h2 className="text-xl font-bold text-white">{habit.name}</h2>
                  <p className="text-gray-400">{habit.description || 'No description'}</p>
                  <p className="mt-2 text-sm capitalize text-yellow-300">
                    {habit.difficulty} / {habit.frequency} / +{habit.xp_reward} XP
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    disabled={habit.completed_today}
                    onClick={() => handleComplete(habit.id)}
                    className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-500 disabled:bg-gray-700"
                  >
                    {habit.completed_today ? 'Done Today' : 'Complete'}
                  </button>
                  <button
                    onClick={() => startEdit(habit)}
                    className="rounded-lg bg-gray-800 px-4 py-2 text-gray-200 hover:bg-gray-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(habit.id)}
                    className="rounded-lg bg-red-900 px-4 py-2 text-red-100 hover:bg-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default HabitsPage;
