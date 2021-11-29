import React, { useState, useEffect } from "react";

import { Check } from "@bigbinary/neeto-icons";
import { Input, Button } from "@bigbinary/neetoui/v2";
import Logger from "js-logger";

import categoriesApi from "../../apis/categories";

const AddCategory = ({ isAddCollapsed, setIsAddCollapsed }) => {
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");

  const addCategory = async () => {
    try {
      await categoriesApi.create({
        category: { name: categoryName },
      });
    } catch (errors) {
      Logger.errors(errors);
    }
  };

  const handleSubmit = () => {
    if (!categoryName.trim()) setError("Name cannot be blank");
    else {
      addCategory();
      setError("");
      setCategoryName("");
      setIsAddCollapsed(true);
    }
  };

  useEffect(() => {
    setError("");
  }, [isAddCollapsed]);

  if (!isAddCollapsed) {
    return (
      <div>
        <Input
          placeholder="Add new category"
          error={error}
          value={categoryName}
          suffix={
            <Button
              style="link"
              className="text-black"
              icon={() => <Check />}
              onClick={() => handleSubmit()}
            />
          }
          onChange={e => {
            setCategoryName(e.target.value), setError("");
          }}
        />
      </div>
    );
  }

  return <div></div>;
};

export default AddCategory;
