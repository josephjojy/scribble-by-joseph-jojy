import React from "react";

import { Edit, Delete, Reorder, Check } from "@bigbinary/neeto-icons";
import { Typography, Button, Input } from "@bigbinary/neetoui/v2";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableList = ({
  category,
  editId,
  categoryName,
  setCategoryName,
  setNameError,
  handleEdit,
  nameError,
  setDeleteAlert,
  setDeleteId,
  setIsAddCategory,
  setEditId,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex justify-between border-t-2 pt-4"
    >
      {category.id === editId ? (
        <Typography className="my-auto font-semibold flex">
          <Reorder />
          <Input
            value={categoryName}
            onChange={e => {
              setCategoryName(e.target.value);
              setNameError(null);
            }}
            suffix={
              <Button icon={Check} style="text" onClick={() => handleEdit()} />
            }
            error={nameError}
          />
        </Typography>
      ) : (
        <>
          <Typography className="my-auto font-semibold flex">
            <Reorder />
            {category.name}
          </Typography>
          <div>
            <Button
              label={<Delete />}
              style="text"
              onClick={() => {
                setDeleteAlert(true);
                setDeleteId(category.id);
              }}
            />
            <Button
              label={<Edit />}
              style="text"
              onClick={() => {
                setIsAddCategory(false);
                setCategoryName(category.name);
                setEditId(category.id);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SortableList;
