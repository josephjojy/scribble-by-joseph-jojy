import React, { useEffect, useState } from "react";

import { Plus, Check } from "@bigbinary/neeto-icons";
import {
  Typography,
  Button,
  Alert,
  Input,
  PageLoader,
} from "@bigbinary/neetoui/v2";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Logger from "js-logger";

import categoriesApi from "apis/categories";

import SortableList from "./SortableList";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [editId, setEditId] = useState();
  const [isAddCategory, setIsAddCategory] = useState(false);
  const [nameError, setNameError] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleDelete = async () => {
    try {
      await categoriesApi.destroy(deleteId);
      fetchCategories();
    } catch (error) {
      Logger.error(error);
    }
  };

  const handleEdit = async () => {
    if (!categoryName) setNameError("Name cannot be blank");
    else {
      try {
        await categoriesApi.update(editId, {
          category: {
            name: categoryName,
          },
        });
        setEditId();
        fetchCategories();
      } catch (error) {
        Logger.error(error);
      }
    }
  };

  const handleCreate = async () => {
    if (!categoryName) setNameError("Name cannot be blank");
    else {
      try {
        await categoriesApi.create({
          category: {
            name: categoryName,
          },
        });
        fetchCategories();
      } catch (error) {
        Logger.error(error);
      }
      setIsAddCategory(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await categoriesApi.index();
      const { categories } = await response.data;
      setCategories(categories);
      setLoading(false);
    } catch (error) {
      Logger.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleReorder = async categoryList => {
    const reorder = categoryList.map((category, index) => ({
      id: category.id,
      position: index,
    }));
    try {
      await categoriesApi.update_position({
        category: {
          reorder: reorder,
        },
      });
      fetchCategories();
    } catch (error) {
      Logger.error(error);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 2 } })
  );

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      setCategories(items => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        handleReorder(arrayMove(items, oldIndex, newIndex));
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  if (loading) return <PageLoader className="m-auto" />;

  return (
    <div className="overflow-y-scroll w-full flex justify-center my-10">
      <Alert
        isOpen={deleteAlert}
        message="Are you sure you want to delete?"
        onClose={() => setDeleteAlert(false)}
        onSubmit={() => {
          handleDelete();
          setDeleteAlert(false);
        }}
        title="Delete Category!"
      />
      <div className="w-600">
        <Typography style="h2">Manage Categories</Typography>
        <Typography className="text-gray-600" style="body1">
          Create and configure the categories inside your scribble.
        </Typography>
        <div className="mt-8 space-y-4">
          {isAddCategory ? (
            <Input
              value={categoryName}
              onChange={e => {
                setCategoryName(e.target.value);
                setNameError(null);
              }}
              suffix={
                <Button
                  icon={Check}
                  style="text"
                  onClick={() => handleCreate()}
                />
              }
              error={nameError}
              className="w-1/2"
            />
          ) : (
            <Typography
              className="my-auto text-indigo-500 font-semibold flex cursor-pointer"
              onClick={() => {
                setEditId();
                setCategoryName();
                setIsAddCategory(true);
              }}
            >
              <Plus />
              Add new category
            </Typography>
          )}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={categories}
              strategy={verticalListSortingStrategy}
            >
              {categories.map(category => (
                <SortableList
                  key={category.id}
                  category={category}
                  editId={editId}
                  categoryName={categoryName}
                  setCategoryName={setCategoryName}
                  setNameError={setNameError}
                  handleEdit={handleEdit}
                  nameError={nameError}
                  setDeleteAlert={setDeleteAlert}
                  setDeleteId={setDeleteId}
                  setIsAddCategory={setIsAddCategory}
                  setEditId={setEditId}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
};

export default ManageCategories;
