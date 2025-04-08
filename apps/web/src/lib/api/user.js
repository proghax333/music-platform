import { useQuery } from "@tanstack/react-query";
import { api } from "../http";
import { GRAPHQL_ENDPOINT } from "../graphql";

export const QUERY_ME = () => ["me"];

export const useMeQuery = ({ ...options } = {}) => {
  return useQuery({
    queryKey: QUERY_ME(),
    queryFn: async () => {
      const response = await api.post(GRAPHQL_ENDPOINT, {
        query: `
query MeQuery {
  me {
    _id
    username
    email

    profiles {
        _id
        name
        avatar
        bio
    }
  }
}
        `,
      });

      return response.data.data.me;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
    ...options,
  });
};
