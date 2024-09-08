export type TaskListOutput = {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
}

export type TaskListInput = {
    title: string;
}