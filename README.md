# git-properties

#### How to use

```js
import gitProperties from "git-properties";

async () => {
  await gitProperties();
};
```

| Parameters | Description                               | Default                      |
| ---------- | ----------------------------------------- | ---------------------------- |
| destFile   | Set the destination of the generated file | Default to project root path |

#### Scripts:

- `yarn build`
- `yarn test`

#### Example output:

> git.properties.json

```json5
{
  branch: "master",
  commit: {
    message: "update README.md",
    id: "8c7f48581094cb1e9ce68f33f2631e3bd7927591",
    time: "2020-08-23T00:00:00.000Z",
    user: { name: "User", email: "user@email.com" },
  },
}
```
