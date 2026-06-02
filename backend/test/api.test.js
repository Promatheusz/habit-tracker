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
