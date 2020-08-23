const path = require("path");
const gitProperties = require("../index");

it("should retrieve branch", async () => {
  const branch = await gitProperties.retrieveBranch();
  expect(branch).not.toBeNull();
  expect(branch).not.toBe("UNKNOWN");
});

it("should retrieve commit info", async () => {
  const { message, id, user } = await gitProperties.retrieveCommit();
  expect(id).not.toBeNull();
  expect(user).not.toBeNull();
  expect(message).not.toBeNull();
  expect(user.name).not.toBeNull();
  expect(user.email).not.toBeNull();

  expect(id).toHaveLength(40);
  expect(message.length).toBeGreaterThan(2);
});

it("should retrieve general info", async () => {
  await gitProperties.default();

  const resultPath = require(path.resolve("./") + "/git.properties.json");

  expect(resultPath).toHaveProperty("branch");
  expect(resultPath).toHaveProperty("commit");

  expect(resultPath.commit.id).not.toBeNull();
  expect(resultPath.commit.user).not.toBeNull();
  expect(resultPath.commit.message).not.toBeNull();
  expect(resultPath.commit.user.name).not.toBeNull();
  expect(resultPath.commit.user.email).not.toBeNull();

  expect(resultPath.commit.id).toHaveLength(40);
  expect(resultPath.commit.message.length).toBeGreaterThan(2);
});
