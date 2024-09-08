import baseApi, {APIResponse} from "@/redux/config/baseApi.service";
import {TaskListInput, TaskListOutput} from "@/redux/features/taskList/taskList.type";

const taskListApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createTaskList: builder.mutation<APIResponse<TaskListOutput>, TaskListInput>({
            invalidatesTags: ["TaskList"],
            query: (body) => ({
                body,
                method: "POST",
                url: "/task-list",
            })
        })
    })
})

export const {
    useCreateTaskListMutation
} = taskListApi
export default taskListApi