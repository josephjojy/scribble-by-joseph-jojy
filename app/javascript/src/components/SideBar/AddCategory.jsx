import React, { useState, useEffect } from "react";

import { Check } from "@bigbinary/neeto-icons";
import { Input, Button } from "@bigbinary/neetoui/v2";

const AddCategory = ({ isAddCollapsed, setIsAddCollapsed }) => {
  const [categories, setCategories] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!categories.trim()) setError("Name cannot be blank");
    else {
      setError("");
      setCategories("");
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
          value={categories}
          suffix={
            <Button
              style="link"
              className="text-black"
              icon={() => <Check />}
              onClick={() => handleSubmit()}
            />
          }
          onChange={e => {
            setCategories(e.target.value), setError("");
          }}
        />
      </div>
    );
  }

  return <div></div>;
};

export default AddCategory;
