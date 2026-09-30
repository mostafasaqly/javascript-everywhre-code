// http [client (http request) - server(http response)] get post put/patch delete     JSON
// response : data , status code
//get post put/patch delete 
// CRUD
// GET /tasks
[
  {
    "id": 1,
    "title": "Learn TypeScript",
    "completed": false
  },
  {
    "id": 2,
    "title": "Learn Fetch",
    "completed": true
  }
]
// GET /tasks/1
// {
//     "id": 1,
//     "title": "Learn TypeScript",
//     "completed": false
//   }

// POST /tasks => body {"title" : " ", "description" : ""} : object created : 201
// PUT /tasks => body {"title" : " ", "description" : ""}
// PATCH /tasks => body {"description" : ""} 
// DELETE /tasks/1

// 200, 201, 204 
// 400, 401, 403, 404  => client error
// 500 => server error

// Fetch
// fetch("https://jsonplaceholder.typicode.com/todos/1");
// async await .then()   .catch()

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

async function getTodo(id:number): Promise<Todo> {
  
  const response = await fetch(
    "https://api.escuelajs.co/api/v1/products/5",
    {
        method: "POST",
        headers: {"Content-type": "application/json"}
    },
    // body : JSON.stringify(input)
  );

  const data: Todo = await response.json();

  return data;
}
// async function run(): Promise<void> {
//   try {

//     const todo = await getTodo(1);

//     // console.log(todo);

//   } catch (error) {

//     if (error instanceof Error) {
//       // console.log(error.message);
//     }

//   }
// }

// run();
interface UpdateTodoInput
{
     title: string;
  completed: boolean;
}
async function updateTodo(
  id: number,
  input: UpdateTodoInput
): Promise<Todo> {

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(input)
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to update todo: ${response.status}`
    );
  }

  const todo: Todo = await response.json();

  return todo;
}


async function fetchJson<T>(
  url: string
): Promise<T> {

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `HTTP Error: ${response.status}`
    );
  }

  const data: T = await response.json();

  return data;
}
async function run(): Promise<void> {

  const todo = await fetchJson<Todo>(
    "https://api.escuelajs.co/api/v1/products/5"
  );

  console.log(todo);
}

run();