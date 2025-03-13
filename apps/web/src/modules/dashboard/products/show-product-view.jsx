import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { FaTimes } from "react-icons/fa";

export function ShowProductView({ open, onClose, product }) {
  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      {/* Title */}
      <DialogTitle className="flex justify-between items-center">
        <span className="text-xl font-bold">Product Details</span>
        <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
          <FaTimes size={18} />
        </button>
      </DialogTitle>

      <DialogContent>
        <div className="p-4 space-y-6">
          {/* Product Name & Description */}
          <div>
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <p className="font-semibold mt-2">
              Code: <span className="text-gray-700">{product.code}</span>
            </p>
          </div>

          {/* Product Image Grid */}
          {product.images && product.images.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Product Images</h3>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {product.images.map((img) => (
                  <img
                    key={img.id}
                    src={img.previewURL}
                    alt={product.name}
                    className="rounded-lg shadow-lg w-full h-28 object-cover"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Variants Section */}
          {product.variants && product.variants.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Variants</h3>
              <div className="space-y-6">
                {product.variants.map((variant, index) => (
                  <div key={index} className="border p-4 rounded-lg shadow-sm">
                    {/* Variant Name & Description */}
                    <p className="font-semibold text-lg">
                      {variant.name} - {variant.type}
                    </p>
                    <p className="text-gray-600">{variant.description}</p>

                    {/* Variant Image Grid */}
                    {variant.images && variant.images.length > 0 && (
                      <div className="mt-3">
                        <h4 className="text-md font-semibold mb-2">
                          Variant Images
                        </h4>
                        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                          {variant.images.map((img) => (
                            <img
                              key={img.id}
                              src={img.previewURL}
                              alt={variant.name}
                              className="rounded-lg shadow-lg w-full h-28 object-cover"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>

      {/* Close Button */}
      <DialogActions>
        <Button variant="contained" color="primary" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
