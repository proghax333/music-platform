import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../http";
import { GRAPHQL_ENDPOINT } from "../graphql";

export const QUERY_CARTITEMS = (profile) => {
  return ["cartItems", profile];
};

export const useDeleteCartItemMutation = (options = {}) => {
  const query = `mutation DeleteCartItem($deleteCartItemId: ObjectId!) {
  deleteCartItem(id: $deleteCartItemId) {
    code
    message
    success
    errors
  }
}`;
  return useMutation({
    mutationFn: async ({ id }) => {
      const response = await api.post(GRAPHQL_ENDPOINT, {
        query,
        variables: {
          deleteCartItemId: id,
        },
      });
      const result = response.data;
      return result.data.deleteCartItem;
    },
    ...options,
  });
};

export const useUpdateCartItemMutation = (options = {}) => {
  const query = `mutation UpdateCartItem($updateCartItemId: ObjectId!, $updateCartItemInput: UpdateCartItemInput!) {
  updateCartItem(id: $updateCartItemId, input: $updateCartItemInput) {
    message
    code
    success

    cartItem {
      _id
      quantity
      total
      variant {
        _id
        name
        description
        price
        type
      }
    }
  }
}`;

  return useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const response = await api.post(GRAPHQL_ENDPOINT, {
        query,
        variables: {
          updateCartItemId: id,
          updateCartItemInput: updatedData,
        },
      });

      const data = response.data.data.updateCartItem;
      if (!data.success) {
        throw new Error(data.message);
      } else {
        return data.cartItem;
      }
    },

    ...options,
  });
};

export const useCartItemsQuery = (profile) => {
  const query = `query CartItems($profile: ObjectId!) {
  cartItems(profile: $profile) {
    _id
    quantity
    total
    variant {
      _id
      name
      description
      price
      type
      product {
        _id
        name
      }
      images {
        _id
        url 
      }
    }
  }
}
`;
  return useQuery({
    queryKey: QUERY_CARTITEMS(profile),
    queryFn: async () => {
      const response = await api.post(GRAPHQL_ENDPOINT, {
        query: query,
        variables: {
          profile,
        },
      });
      return response.data.data.cartItems;
    },
  });
};
