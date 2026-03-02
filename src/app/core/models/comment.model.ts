export interface Comment {
  id: string;
  taskId: number;
  text: string;
  parentId?: string;
  createdAt: string;
}
