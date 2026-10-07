export function Jsx() {
  const learner = "Sara";

  const scores = [92, 68, 85];

  const average =
    scores.reduce((sum, score) => sum + score, 0) / scores.length;

  return (
    <section>
      <h2>{learner}'s Scores</h2>

      <p>Average: {average.toFixed(1)}</p>

      <p>
        Status:
        {average >= 70 ? " Passed" : " Failed"}
      </p>

      <p>Highest: {Math.max(...scores)}</p>

      <label htmlFor="note">Note</label>

      <input id="note" type="text" />
    </section>
  );
}