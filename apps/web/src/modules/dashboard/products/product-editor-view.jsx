import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import {
  FaTimes,
  FaPlus,
  FaTrash,
  FaGripVertical,
  FaEdit,
} from "react-icons/fa";
import ImageUploadGrid from "@/ui/ImageUploadGrid";
import { deriveSetState } from "@/utils/state";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

function ProductEditorView({ open, onClose, onSave, data }) {
  const defaultProduct = {
    code: "",
    name: "",
    description: "",
    images: [],
    variants: [],
  };

  const defaultVariant = {
    name: "",
    type: "",
    description: "",
    images: [],
  };

  const [product, setProduct] = useState(defaultProduct);
  const [variant, setVariant] = useState(defaultVariant);
  const [editingVariantIndex, setEditingVariantIndex] = useState(null);

  useEffect(() => {
    if (data) {
      setProduct(data);
    } else {
      setProduct(defaultProduct);
    }
  }, [data, open]);

  function handleChange(e) {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  }

  function handleVariantChange(e) {
    const { name, value } = e.target;
    setVariant((prev) => ({ ...prev, [name]: value }));
  }

  function addOrUpdateVariant() {
    if (variant.name && variant.type && variant.description) {
      setProduct((prev) => {
        const updatedVariants = [...prev.variants];

        if (editingVariantIndex !== null) {
          updatedVariants[editingVariantIndex] = variant;
        } else {
          updatedVariants.push(variant);
        }

        return { ...prev, variants: updatedVariants };
      });

      setVariant(defaultVariant);
      setEditingVariantIndex(null);
    }
  }

  function editVariant(index) {
    setVariant(product.variants[index]);
    setEditingVariantIndex(index);
  }

  function removeVariant(index) {
    setProduct((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
    setEditingVariantIndex(null);
  }

  function handleSave() {
    if (
      product.code &&
      product.name &&
      product.description &&
      product.images.length > 0
    ) {
      onSave(product);
      onClose();
    }
  }

  const variantSensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleVariantDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setProduct((prev) => {
        const oldIndex = prev.variants.findIndex((v) => v.name === active.id);
        const newIndex = prev.variants.findIndex((v) => v.name === over.id);

        return {
          ...prev,
          variants: arrayMove(prev.variants, oldIndex, newIndex),
        };
      });
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="relative text-lg font-bold text-gray-800 bg-gray-100 p-4 rounded-t-lg flex w-full justify-between items-center">
        {data ? "Edit Product" : "Add New Product"}
        <IconButton
          onClick={onClose}
          className="text-gray-500 hover:text-red-500"
        >
          <FaTimes />
        </IconButton>
      </DialogTitle>
      <DialogContent className="bg-gray-50 p-6">
        <div className="space-y-4">
          <TextField
            label="Product Code"
            name="code"
            value={product.code}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Product Name"
            name="name"
            value={product.name}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Description"
            name="description"
            value={product.description}
            onChange={handleChange}
            fullWidth
            required
            multiline
            rows={3}
          />

          <div>
            <h4 className="text-md font-semibold text-gray-700 mb-2">
              Product Images
            </h4>
            <ImageUploadGrid
              images={product.images}
              setImages={deriveSetState(setProduct, ["images"])}
            />
          </div>

          {/* Variants Section */}
          <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-gray-700">Variants</h4>

            <DndContext
              sensors={variantSensors}
              collisionDetection={closestCenter}
              onDragEnd={handleVariantDragEnd}
            >
              <SortableContext
                items={product.variants.map((v) => v.name)}
                strategy={verticalListSortingStrategy}
              >
                {product.variants.length > 0 ? (
                  <div className="grid gap-3 mt-3">
                    {product.variants.map((v, index) => (
                      <DraggableVariant
                        key={v.name}
                        id={v.name}
                        variant={v}
                        onEdit={() => editVariant(index)}
                        onRemove={() => removeVariant(index)}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm mt-2">
                    No variants added.
                  </p>
                )}
              </SortableContext>
            </DndContext>

            {/* Add or Edit Variant Fields */}
            <div className="flex flex-col w-full gap-2 mt-4">
              <TextField
                label="Variant Name"
                name="name"
                value={variant.name}
                onChange={handleVariantChange}
                fullWidth
              />
              <TextField
                label="Type"
                name="type"
                value={variant.type}
                onChange={handleVariantChange}
                fullWidth
              />
              <TextField
                label="Description"
                name="description"
                value={variant.description}
                onChange={handleVariantChange}
                fullWidth
                required
                multiline
                rows={3}
              />
            </div>

            <div className="my-4">
              <h4 className="text-md font-semibold text-gray-700 mt-4 mb-2">
                Variant Images
              </h4>
              <ImageUploadGrid
                images={variant.images}
                setImages={deriveSetState(setVariant, ["images"])}
              />
            </div>

            <Button
              onClick={addOrUpdateVariant}
              variant="contained"
              color="secondary"
              startIcon={<FaPlus />}
              fullWidth
              className="mt-4"
            >
              {editingVariantIndex !== null ? "Update Variant" : "Add Variant"}
            </Button>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          {data ? "Update Product" : "Save Product"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function DraggableVariant({ id, variant, onEdit, onRemove }) {
  const { attributes, listeners, setNodeRef, transform } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: transform ? `translate3d(0, ${transform.y}px, 0)` : "none",
      }}
      {...attributes}
      className="flex items-center justify-between p-2 border rounded-md bg-gray-100 cursor-pointer"
    >
      <div className="flex items-center gap-2">
        <FaGripVertical className="cursor-grab text-gray-500" {...listeners} />
        <span className="text-gray-800">
          {variant.name} -{" "}
          <span className="badge badge-primary">{variant.type}</span>
        </span>
      </div>
      <div className="flex gap-2">
        <IconButton
          onClick={onEdit}
          className="text-blue-500 hover:text-blue-700"
        >
          <FaEdit />
        </IconButton>
        <IconButton
          onClick={onRemove}
          className="text-red-500 hover:text-red-700"
        >
          <FaTrash />
        </IconButton>
      </div>
    </div>
  );
}

export default ProductEditorView;
