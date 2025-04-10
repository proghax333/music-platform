import { useMutation } from "@tanstack/react-query";
import { api } from "../http";
import { GRAPHQL_ENDPOINT } from "../graphql";

export const useLoginMutation = ({ ...options } = {}) => {
  const loginMutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.post(GRAPHQL_ENDPOINT, {
        query: `
mutation LoginMutation($input: LoginMutationInput!) {
  login(input: $input) {
    code
    success
    message

    user {
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

    accessToken
    refreshToken
  }
}
`,
        variables: {
          input: data,
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
    ...options,
  });

  return loginMutation;
};

export const useLogoutMutation = ({ ...options } = {}) => {
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post(GRAPHQL_ENDPOINT, {
        query: `
mutation LogoutMutation {
  logout {
    code
    success
    message
  }
}
`,
      });
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
    ...options,
  });

  return logoutMutation;
};

export const useSignupMutation = ({ ...options } = {}) => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await api.post(GRAPHQL_ENDPOINT, {
        query: `
        mutation SignupMutation($input: SignupMutationInput!) {
          signup(input: $input) {
            code
            success
            message
            user {
              _id
              username
              email
            }
          }
        }
`,
        variables: {
          input: data,
        },
      });
      return response.data;
    },
    ...options,
  });
};
