export interface TaskApi {
  status: boolean,
  title: string,
}

export interface Task extends TaskApi {
  id: string;
}

export interface TasksApi {
  [id: string]: TaskApi;
}