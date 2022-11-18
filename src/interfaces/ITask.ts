export interface ITask {
  _id: string;
  boardId: string;
  columnId: string;
  title: string;
  order: number;
  description: string;
  userId: number;
  users: Array<string>;
}