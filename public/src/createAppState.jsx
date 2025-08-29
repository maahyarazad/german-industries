import { signal, computed } from "@preact/signals-react";

export function createAppState() {
  // Initialize with dummy data
  const todos = signal([
    { id: 1, text: "Buy groceries", completed: false },
    { id: 2, text: "Walk the dog", completed: true },
    { id: 3, text: "Read a book", completed: false },
  ]);

  const completed = computed(() => {
    return todos.value.filter(todo => todo.completed).length;
  });

  const user = signal({})
  

  return { todos, completed, user };
}
