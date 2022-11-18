export interface ITask extends INewTask {
  _id: string;
  boardId: string;
  columnId: string;
}

export interface INewTask {
  title: string;
  order: number;
  description: string;
  userId: number;
  users: Array<string>;
}
