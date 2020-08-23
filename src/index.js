import { promises as fs } from "fs";
import util from "util";
import { exec } from "child_process";
import path from "path";

const asyncExec = util.promisify(exec);
const UNKNONW = "UNKNOWN";

export const retrieveBranch = async () => {
  const { stdout, stderr } = await asyncExec("git rev-parse --abbrev-ref HEAD");

  if (stderr) {
    return UNKNONW;
  }
  return `${stdout.replace("\n", "")}`;
};

export const retrieveCommit = async () => {
  const { stdout, stderr } = await asyncExec(
    'git --no-pager log -1 --pretty=format:"%H,%an,%ae,%ci,%s" --decorate=full'
  );

  if (stderr) {
    return {
      message: UNKNONW,
      id: UNKNONW,
      time: UNKNONW,
      user: { name: UNKNONW, email: UNKNONW },
    };
  }
  const [id, name, email, time, message] = stdout.split(",");
  return {
    message,
    id,
    time,
    user: { name, email },
  };
};

export const buildGitInfo = async () => {
  const [branch, commit] = await Promise.all([
    retrieveBranch(),
    retrieveCommit(),
  ]);
  return { branch, commit };
};

const generateGitProperties = async (
  options = { destFile: path.resolve("./") + "/git.properties" }
) => {
  const data = await buildGitInfo();
  await fs.writeFile(options.destFile, JSON.stringify(data), {
    encoding: "utf-8",
  });
};

export default generateGitProperties;
