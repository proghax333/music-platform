import { useQuery } from "@tanstack/react-query";
import { api } from "../http";
import { GRAPHQL_ENDPOINT } from "../graphql";

export const QUERY_PRODUCTS = () => ["products"];

export const useProductsQuery = () => {
    const query = `
query ListProduct{
  products {
    edges {
      cursor
      node {
        _id
        name
        description
        brand {
          name
        }
        category {
          name
        }
        variants {
          edges {
            node {
              _id
              name
              description
              price
              type

              images {
                id
                url
              }
            }
          }
        }
      }
    }
  }
}
    `;

    return useQuery({
        queryKey: QUERY_PRODUCTS(),
        queryFn: async () => {
            const res = await api.post(GRAPHQL_ENDPOINT, {
                query,
            });

            return res.data.data.products;
        }
    })
};

export const QUERY_PRODUCTVARIANT = (id) => ["productVariants", id];

export const useProductVariantQuery = (id) => {
    const query = `
query GetVariant($id: ObjectId!) {
    productVariant(id: $id) {
      _id
      name
      description
      price
      type
      
      product {
        _id
        name
        description

        variants {
          edges {
            node {
              _id
              name
              type
              description
              images {
                id
                url
              }
            }
          }
        }
      }

      images {
        id
        url
      }
    }
  }

`;

    return useQuery({
        queryKey: QUERY_PRODUCTVARIANT(id),
        queryFn: async () => {
            const res = await api.post(GRAPHQL_ENDPOINT, {
                query,
                variables: {
                    id
                }
            });

            return res.data.data.productVariant;
        }
    })
};

