interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface CreateTodoInput {
  userId: number;
  title: string;
  completed: boolean;
}

function getErrorMessage(
  error: unknown
): string {

  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown error";
}

async function getTodos(): Promise<Todo[]> {

  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos"
  );

  if (!response.ok) {
    throw new Error(
      `Failed to load todos: ${response.status}`
    );
  }

  return response.json();
}

async function createTodo(
  input: CreateTodoInput
): Promise<Todo> {

  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(input)
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to create todo: ${response.status}`
    );
  }

  return response.json();
}

async function main(): Promise<void> {

  try {

    const todos = await getTodos();

    // console.log("Todos:");
    // console.log(todos);

    const newTodo = await createTodo({
      userId: 1,
      title: "Practice TypeScript APIs",
      completed: false
    });

    // console.log("Created Todo:");
    // console.log(newTodo);

  } catch (error) {

    const message = getErrorMessage(error);

    // console.log("Error:");
    // console.log(message);

  }
}

// main();