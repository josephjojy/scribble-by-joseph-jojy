import React, { useState } from "react";

import Logger from "js-logger";

import articlesApi from "apis/articles";

import ArticleForm from "./ArticleForm";

const AddArticles = () => {
  const [status, setStatus] = useState("Save Draft");
  const [articleTitle, setArticleTitle] = useState("");
  const [category, setCategory] = useState("");
  const [articleBody, setArticleBody] = useState("");
  const [errors, setErrors] = useState({
    title: null,
    category: null,
    body: null,
  });

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

  return (
    <div>
      <ArticleForm
        status={status}
        setStatus={setStatus}
        articleTitle={articleTitle}
        setArticleTitle={setArticleTitle}
        category={category}
        setCategory={setCategory}
        articleBody={articleBody}
        setArticleBody={setArticleBody}
        errors={errors}
        setErrors={setErrors}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddArticles;
