import React, { useState, useEffect } from "react";

import {
  Input,
  Select,
  Textarea,
  Button,
  Dropdown,
} from "@bigbinary/neetoui/v2";
import Logger from "js-logger";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

const AddArticles = () => {
  const [status, setStatus] = useState("Save Draft");
  const [categories, setCategories] = useState([]);
  const [articleTitle, setArticleTitle] = useState("");
  const [category, setCategory] = useState("");
  const [articleBody, setArticleBody] = useState("");
  const [errors, setErrors] = useState({
    title: null,
    category: null,
    body: null,
  });

  const handleStatus = () => {
    setStatus(status === "Save Draft" ? "Published" : "Save Draft");
  };

  const handleSubmit = async () => {
    setErrors({
      ...errors,
      title: articleTitle ? null : "Enter Title",
      category: category ? null : "Select Category",
      body: articleBody ? null : "Enter Body",
    });
    if (category && articleBody && articleTitle) {
      try {
        await articlesApi.create({
          article: {
            title: articleTitle,
            content: articleBody,
            status: status === "Save Draft" ? 0 : 1,
            category_id: category,
          },
        });
        window.location.href = "/";
      } catch (error) {
        Logger.error(error);
      }
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await categoriesApi.index();
      const { categories } = await response.data;
      setCategories(categories);
    } catch (error) {
      Logger.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <form
        onSubmit={event => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <div className="mx-auto w-2/5 my-10 space-y-5 h-full">
          <div className="flex space-x-5">
            <Input
              label="Article Title"
              placeholder="Enter article title"
              value={articleTitle}
              onChange={e => {
                setArticleTitle(e.target.value);
                setErrors({ ...errors, title: null });
              }}
              error={errors.title}
            />
            <Select
              label="Category"
              size="small"
              placeholder="Select a category"
              options={categories.map(category => ({
                label: category.name,
                value: category.id,
              }))}
              onChange={e => {
                setCategory(e.value);
                setErrors({ ...errors, category: null });
              }}
              error={errors.category}
              required
            />
          </div>
          <Textarea
            label="Article Body"
            placeholder="Enter Article body"
            value={articleBody}
            onChange={e => {
              setArticleBody(e.target.value);
              setErrors({ ...errors, body: null });
            }}
            error={errors.body}
            rows={10}
            required
          />
          <div className="flex">
            <Button className="bg-indigo-500" label={status} type="submit" />
            <Dropdown
              buttonProps={{
                className: "bg-indigo-500",
              }}
              autoWidth="false"
            >
              <div
                className="bg-indigo-500 text-right p-1 text-white cursor-pointer"
                onClick={() => handleStatus()}
              >
                {status === "Save Draft" ? "Published" : "Save Draft"}
              </div>
            </Dropdown>
            <Button label="Cancel" style="text" to="/" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddArticles;
