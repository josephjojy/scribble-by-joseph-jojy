import React, { useEffect, useState } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import Logger from "js-logger";
import { useParams } from "react-router-dom";

import articlesApi from "apis/articles";

import ArticleForm from "./ArticleForm";

const EditArticles = () => {
  const [status, setStatus] = useState("");
  const [articleTitle, setArticleTitle] = useState("");
  const [category, setCategory] = useState("");
  const [articleBody, setArticleBody] = useState("");
  const [errors, setErrors] = useState({
    title: null,
    category: null,
    body: null,
  });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const handleSubmit = async () => {
    setErrors({
      ...errors,
      title: articleTitle ? null : "Enter Title",
      category: category ? null : "Select Category",
      body: articleBody ? null : "Enter Body",
    });
    if (category && articleBody && articleTitle) {
      try {
        await articlesApi.update(id, {
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

  const fetchArticle = async () => {
    try {
      const response = await articlesApi.show(id);
      const { article } = response.data;
      setArticleTitle(article.title);
      setArticleBody(article.content);
      setCategory(article.category);
      setStatus(article.status === "Draft" ? "Save Draft" : "Publish");
      setLoading(false);
    } catch (error) {
      Logger.error(error);
    }
  };
  useEffect(() => {
    fetchArticle();
  }, []);

  if (loading) return <PageLoader />;

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

export default EditArticles;
