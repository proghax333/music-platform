import { Breadcrumbs, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

import { ShowProductView } from "./show-product-view";
import ProductEditorView from "./product-editor-view";
import DeleteProductView from "./delete-product-view";

const mockProducts = [
  {
    id: 1,
    code: "P001",
    name: "Product A",
    description: "Description of Product A",
    images: [
      {
        id: "img_1",
        src: "https://picsum.photos/100?random=1",
        previewURL: "https://picsum.photos/100?random=1",
        status: "remote",
      },
    ],
    variants: [
      {
        name: "Variant 1",
        type: "Small",
        description: "Small size",
        images: [
          {
            id: "img_21",
            src: "https://picsum.photos/100?random=21",
            previewURL: "https://picsum.photos/100?random=21",
            status: "remote",
          },
        ],
      },
      {
        name: "Variant 2",
        type: "Large",
        description: "Large size",
        images: [
          {
            id: "img_22",
            src: "https://picsum.photos/100?random=22",
            previewURL: "https://picsum.photos/100?random=22",
            status: "remote",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    code: "P002",
    name: "Product B",
    description: "Description of Product B",
    images: [
      {
        id: "img_2",
        src: "https://picsum.photos/100?random=2",
        previewURL: "https://picsum.photos/100?random=2",
        status: "remote",
      },
    ],
    variants: [
      {
        name: "Variant 1",
        type: "Red",
        description: "Red color",
        images: [
          {
            id: "img_23",
            src: "https://picsum.photos/100?random=23",
            previewURL: "https://picsum.photos/100?random=23",
            status: "remote",
          },
        ],
      },
      {
        name: "Variant 2",
        type: "Blue",
        description: "Blue color",
        images: [
          {
            id: "img_24",
            src: "https://picsum.photos/100?random=24",
            previewURL: "https://picsum.photos/100?random=24",
            status: "remote",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    code: "P003",
    name: "Product C",
    description: "Description of Product C",
    images: [
      {
        id: "img_3",
        src: "https://picsum.photos/100?random=3",
        previewURL: "https://picsum.photos/100?random=3",
        status: "remote",
      },
    ],
    variants: [
      {
        name: "Variant 1",
        type: "Metallic",
        description: "Metallic finish",
        images: [
          {
            id: "img_25",
            src: "https://picsum.photos/100?random=25",
            previewURL: "https://picsum.photos/100?random=25",
            status: "remote",
          },
        ],
      },
      {
        name: "Variant 2",
        type: "Matte",
        description: "Matte finish",
        images: [
          {
            id: "img_26",
            src: "https://picsum.photos/100?random=26",
            previewURL: "https://picsum.photos/100?random=26",
            status: "remote",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    code: "P004",
    name: "Product D",
    description: "Description of Product D",
    images: [
      {
        id: "img_4",
        src: "https://picsum.photos/100?random=4",
        previewURL: "https://picsum.photos/100?random=4",
        status: "remote",
      },
    ],
    variants: [
      {
        name: "Variant 1",
        type: "Wireless",
        description: "Wireless model",
        images: [
          {
            id: "img_27",
            src: "https://picsum.photos/100?random=27",
            previewURL: "https://picsum.photos/100?random=27",
            status: "remote",
          },
        ],
      },
      {
        name: "Variant 2",
        type: "Wired",
        description: "Wired model",
        images: [
          {
            id: "img_28",
            src: "https://picsum.photos/100?random=28",
            previewURL: "https://picsum.photos/100?random=28",
            status: "remote",
          },
        ],
      },
    ],
  },
];

function ProductsView() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [isShowModalOpen, setIsShowModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "images",
      headerName: "Icon",
      width: 100,
      renderCell: (params) => {
        const images = params.row.images;
        return (
          <div className="w-full h-full flex items-center">
            <img
              src={images[0].previewURL}
              alt="Product Icon"
              className="w-10 h-10 rounded"
            />
          </div>
        );
      },
    },
    { field: "code", headerName: "Code", width: 130 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "description", headerName: "Description", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const { row } = params;

        return (
          <div className="flex gap-2 items-center h-full w-full">
            <button
              className="btn btn-primary btn-sm p-0 m-0 px-2 flex items-center rounded-md"
              onClick={(e) => {
                e.stopPropagation();
                handleShowProduct(row.id);
              }}
            >
              <FaEye />
            </button>
            <button
              className="btn btn-info btn-sm p-0 m-0 px-2 flex items-center rounded-md text-white"
              onClick={(e) => {
                e.stopPropagation();
                handleEditProduct(row.id);
              }}
            >
              <FaEdit />
            </button>
            <button
              className="btn btn-error btn-sm p-0 m-0 px-2 flex items-center rounded-md text-white"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteProduct(row.id);
              }}
            >
              <FaTrash />
            </button>
          </div>
        );
      },
    },
  ];

  function handleAddProduct(product) {
    setProducts((prev) => [...prev, { ...product, id: prev.length + 1 }]);
    setIsAddModalOpen(false);
  }

  function handleEditProduct(id) {
    const product = products.find((p) => p.id === id);
    if (product) {
      setEditingProduct(product);
      setIsEditModalOpen(true);
    }
  }

  function handleUpdateProduct(updatedProduct) {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setIsEditModalOpen(false);
    setEditingProduct(null);
  }

  function handleShowProduct(id) {
    const product = products.find((p) => p.id === id);
    if (product) {
      setSelectedProduct(product);
      setIsShowModalOpen(true);
    }
  }

  function handleDeleteProduct(id) {
    const product = products.find((p) => p.id === id);
    if (product) {
      setProductToDelete(product);
      setIsDeleteModalOpen(true);
    }
  }

  function confirmDeleteProduct(id) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setIsDeleteModalOpen(false);
  }

  useEffect(() => {
    setTimeout(() => setProducts(mockProducts), 0);
  }, []);

  return (
    <div className="flex flex-col w-full h-full px-8">
      <div className="pt-4">
        <Breadcrumbs>
          <Link to="/dashboard" className="text-sm hover:underline">
            Dashboard
          </Link>
          <Link to="/dashboard/products" className="text-sm hover:underline">
            Products
          </Link>
          <span className="text-sm">Home</span>
        </Breadcrumbs>

        <div className="mt-4 flex items-center">
          <h2 className="text-2xl font-bold">Products</h2>
          <button
            className="mx-4 btn btn-primary btn-sm"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add new product
          </button>
        </div>

        <div className="mt-4" style={{ height: 400, width: "100%" }}>
          <Paper style={{ padding: "16px" }}>
            <DataGrid
              rows={products}
              columns={columns}
              checkboxSelection
              pageSizeOptions={[10, 25, 50, 100]}
            />
          </Paper>
        </div>
      </div>

      {/* Show Product Modal */}
      <ShowProductView
        open={isShowModalOpen}
        onClose={() => setIsShowModalOpen(false)}
        product={selectedProduct}
      />

      {/* Add Product Modal */}
      <ProductEditorView
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddProduct}
      />

      {/* Edit Product Modal */}
      <ProductEditorView
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleUpdateProduct}
        data={editingProduct}
      />

      {/* Delete Product Modal */}
      <DeleteProductView
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteProduct}
        product={productToDelete}
      />
    </div>
  );
}

export default ProductsView;
