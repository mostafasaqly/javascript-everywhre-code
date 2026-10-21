import { useEffect, useState } from "react";
import { useDebouncedValue } from "../hooks/useDebouncedValue";

interface GitHubUser {
  login: string;
  name: string | null;
  public_repos: number;
  avatar_url: string;
}

type Result =
  | { login: string; user: GitHubUser }
  | { login: string; error: string };

function UserCard({ login }: { login: string }) {
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    console.log("fetch", login);

    fetch(`https://api.github.com/users/${encodeURIComponent(login)}`, { signal: controller.signal })
      .then((res) => {
        if (res.status === 404) throw new Error(`No user called “${login}”.`);
        if (!res.ok) throw new Error(`GitHub answered ${res.status}.`);
        return res.json() as Promise<GitHubUser>;
      })
      .then((user) => setResult({ login, user }))
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") {
          console.log("aborted", login);
          return;
        }
        setResult({ login, error: err instanceof Error ? err.message : "Something went wrong." });
      });

    return () => controller.abort();
  }, [login]);

  if (result === null || result.login !== login) return <p className="hint">Loading…</p>; // derived loading
  if ("error" in result) return <p role="alert" className="error">{result.error}</p>;

  const { user } = result;
  return (
    <article className="card">
      <img src={user.avatar_url} alt="" width={64} height={64} />
      <div>
        <h3>{user.name ?? user.login}</h3>
        <p>{user.public_repos} public repos</p>
      </div>
    </article>
  );
}

export function UserLookup() {
  const [text, setText] = useState("");
  const login = useDebouncedValue(text.trim(), 400);

  return (
    <>
      <label htmlFor="login">GitHub username</label>
      <input id="login" value={text} onChange={(e) => setText(e.target.value)} placeholder="octocat" />
      {login !== "" && <UserCard login={login} />}
    </>
  );
}