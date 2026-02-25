import { todos, type Todo, type InsertTodo } from "@shared/schema";

export interface IStorage {
  getTodos(): Promise<Todo[]>;
}

export class MemStorage implements IStorage {
  private todos: Map<number, Todo> = new Map();
  
  async getTodos(): Promise<Todo[]> {
    return Array.from(this.todos.values());
  }
}

export const storage = new MemStorage();
