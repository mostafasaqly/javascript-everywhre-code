import { AddTask } from "./AddTask";


export default function App() {
  return (
    <>
      <AddTask onAdd={(title) => console.log("Task added:", title)} />
    </>
  );
}