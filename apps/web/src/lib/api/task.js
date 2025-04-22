import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../http";
import { GRAPHQL_ENDPOINT } from "../graphql";

export const QUERY_TASKS = () => ["tasks"];

export const useTasksQuery = () => {
  const query = `
  query Tasks {
  tasks {
    _id
    title
    movie
    difficulty
    status
    acceptance
  }
}`;

  return useQuery({
    queryKey: QUERY_TASKS(),
    queryFn: async () => {
      const response = await api.post(GRAPHQL_ENDPOINT, {
        query: query,
        variables: {},
      });

      return response.data.data.tasks;
    },
  });
};

export const useCreateTaskMutation = (options = {}) => {
  const query = `mutation CreateTask($input: CreateTaskInput!) {
  createTask(input: $input) {
    code
    message
    success

    task {
      _id
      title
      acceptance
      difficulty
      movie
    }
  }
}`;

  return useMutation({
    mutationFn: async (variables) => {
      const response = await api.post(GRAPHQL_ENDPOINT, {
        query,
        variables,
      });

      return response.data.data.createTask;
    },
    ...options,
  });
};
