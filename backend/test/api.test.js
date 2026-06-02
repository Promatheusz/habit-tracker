const assert = require('assert');
const path = require('path');
const test = require('node:test');

process.env.DB_PATH = path.resolve(__dirname, '../database/test.sqlite');

const authController = require('../src/controllers/authController');
const habitController = require('../src/controllers/habitController');
const playerController = require('../src/controllers/playerController');
const { closeDb, initDb } = require('../src/config/db');
const { verifyToken } = require('../src/utils/auth');

function mockResponse() {
  return {
    body: null,
    statusCode: 200,
    json(body) {
      this.body = body;
      return this;
    },
    status(statusCode) {
      this.statusCode = statusCode;
      return this;
    },
  };
}

async function call(handler, req) {
  const res = mockResponse();
  await handler(req, res);
  return res;
}

test.before(async () => {
  await initDb();
});

test.after(async () => {
  await closeDb();
});

test('registers, creates a habit, completes it once, and blocks duplicate completion', async () => {
  const username = `tester_${Date.now()}`;
  const registered = await call(authController.register, {
    body: { username, password: 'password' },
  });

  assert.strictEqual(registered.statusCode, 201);
  assert.ok(registered.body.token);

  const payload = verifyToken(registered.body.token);
  const playerReq = { player: { id: payload.playerId, username }, body: {}, params: {} };

  const created = await call(habitController.createHabit, {
    ...playerReq,
    body: {
      name: 'Test habit',
      difficulty: 'hard',
      frequency: 'daily',
    },
  });

  assert.strictEqual(created.statusCode, 201);
  assert.strictEqual(created.body.xp_reward, 50);

  const completed = await call(habitController.completeHabit, {
    ...playerReq,
    params: { id: created.body.id },
  });

  assert.strictEqual(completed.statusCode, 200);
  assert.strictEqual(completed.body.player.xp, 50);
  assert.strictEqual(completed.body.player.currency, 50);

  const duplicate = await call(habitController.completeHabit, {
    ...playerReq,
    params: { id: created.body.id },
  });

  assert.strictEqual(duplicate.statusCode, 409);
});

test('logs in with valid credentials and rejects invalid credentials', async () => {
  const username = `login_${Date.now()}`;
  await call(authController.register, {
    body: { username, password: 'password' },
  });

  const loggedIn = await call(authController.login, {
    body: { username, password: 'password' },
  });
  assert.strictEqual(loggedIn.statusCode, 200);
  assert.ok(loggedIn.body.token);
  assert.strictEqual(loggedIn.body.player.username, username);

  const failed = await call(authController.login, {
    body: { username, password: 'wrong-password' },
  });
  assert.strictEqual(failed.statusCode, 401);
});

test('loads authenticated profile data', async () => {
  const username = `profile_${Date.now()}`;
  const registered = await call(authController.register, {
    body: { username, password: 'password' },
  });
  const payload = verifyToken(registered.body.token);

  const profile = await call(authController.me, {
    player: { id: payload.playerId, username },
  });

  assert.strictEqual(profile.statusCode, 200);
  assert.strictEqual(profile.body.username, username);
  assert.strictEqual(profile.body.level, 1);
});

test('edits and soft-deletes a habit', async () => {
  const username = `habit_edit_${Date.now()}`;
  const registered = await call(authController.register, {
    body: { username, password: 'password' },
  });
  const payload = verifyToken(registered.body.token);
  const playerReq = { player: { id: payload.playerId, username }, body: {}, params: {} };

  const created = await call(habitController.createHabit, {
    ...playerReq,
    body: {
      name: 'Old name',
      difficulty: 'easy',
      frequency: 'daily',
    },
  });

  const updated = await call(habitController.updateHabit, {
    ...playerReq,
    params: { id: created.body.id },
    body: {
      name: 'Updated name',
      description: 'Updated description',
      difficulty: 'medium',
      frequency: 'weekly',
      target_days_per_week: 2,
    },
  });

  assert.strictEqual(updated.statusCode, 200);
  assert.strictEqual(updated.body.name, 'Updated name');
  assert.strictEqual(updated.body.xp_reward, 25);

  const deleted = await call(habitController.deleteHabit, {
    ...playerReq,
    params: { id: created.body.id },
  });
  assert.strictEqual(deleted.statusCode, 200);

  const habits = await call(habitController.getHabits, playerReq);
  assert.strictEqual(habits.body.some((habit) => habit.id === created.body.id), false);
});

test('levels up when total XP reaches the next threshold', async () => {
  const username = `level_${Date.now()}`;
  const registered = await call(authController.register, {
    body: { username, password: 'password' },
  });
  const payload = verifyToken(registered.body.token);
  const playerReq = { player: { id: payload.playerId, username }, body: {}, params: {} };

  const habitIds = [];
  for (const name of ['Hard 1', 'Hard 2', 'Medium 1']) {
    const created = await call(habitController.createHabit, {
      ...playerReq,
      body: {
        name,
        difficulty: name.startsWith('Hard') ? 'hard' : 'medium',
        frequency: 'daily',
      },
    });
    habitIds.push(created.body.id);
  }

  let completed;
  for (const id of habitIds) {
    completed = await call(habitController.completeHabit, {
      ...playerReq,
      params: { id },
    });
  }

  assert.strictEqual(completed.body.player.xp, 125);
  assert.strictEqual(completed.body.player.level, 2);
});

test('prevents reward purchase when balance is too low', async () => {
  const username = `low_balance_${Date.now()}`;
  const registered = await call(authController.register, {
    body: { username, password: 'password' },
  });
  const payload = verifyToken(registered.body.token);
  const playerReq = { player: { id: payload.playerId, username }, body: {}, params: {} };

  const rewards = await call(playerController.getRewards, playerReq);
  const reward = rewards.body.find((entry) => entry.cost > 0);

  const purchase = await call(playerController.purchaseReward, {
    ...playerReq,
    params: { id: reward.id },
  });

  assert.strictEqual(purchase.statusCode, 400);
});

test('purchases a reward and rejects duplicate purchase', async () => {
  const username = `buyer_${Date.now()}`;
  const registered = await call(authController.register, {
    body: { username, password: 'password' },
  });
  const payload = verifyToken(registered.body.token);
  const playerReq = { player: { id: payload.playerId, username }, body: {}, params: {} };

  const created = await call(habitController.createHabit, {
    ...playerReq,
    body: {
      name: 'Earn currency',
      difficulty: 'hard',
      frequency: 'daily',
    },
  });
  await call(habitController.completeHabit, {
    ...playerReq,
    params: { id: created.body.id },
  });

  const rewards = await call(playerController.getRewards, playerReq);
  const reward = rewards.body.find((entry) => entry.cost <= 50);

  const purchase = await call(playerController.purchaseReward, {
    ...playerReq,
    params: { id: reward.id },
  });
  assert.strictEqual(purchase.statusCode, 200);
  assert.strictEqual(purchase.body.reward.id, reward.id);
  assert.strictEqual(purchase.body.player.xp, 50);

  const duplicate = await call(playerController.purchaseReward, {
    ...playerReq,
    params: { id: reward.id },
  });
  assert.strictEqual(duplicate.statusCode, 400);
});
