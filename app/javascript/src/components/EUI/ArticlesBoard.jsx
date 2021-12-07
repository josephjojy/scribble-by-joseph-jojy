import React, { useEffect, useState } from "react";

import { Typography, PageLoader, Tag } from "@bigbinary/neetoui/v2";
import Logger from "js-logger";
import { useParams } from "react-router-dom";

import publicApi from "apis/public";

const ArticlesBoard = () => {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  const fetchArticle = async () => {
    try {
      const response = await publicApi.show(slug);
      const { article } = response.data;
      setArticle(article);
      setLoading(false);
    } catch (error) {
      {
        Logger.error(error);
      }
    }
  };

  useEffect(() => {
    if (slug) fetchArticle();
  }, [slug]);

  if (loading && slug) {
    return (
      <div className="m-auto">
        <PageLoader />
      </div>
    );
  }

  if (!slug) return <div></div>;

  return (
    <div className="m-8">
      <Typography className="font-bold text-4xl">{article.title}</Typography>
      <div className="flex space-x-3 pt-2">
        <Tag
          style="solid"
          color="blue"
          label={article.category.name}
          size="large"
          className="text-blue-800"
        />
        <Typography className="text-gray-500">{article.date}</Typography>
      </div>
      <Typography className="max-w-screen-xl pt-6 whitespace-pre-wrap">
        {article.content}
      </Typography>
    </div>
  );
};

export default ArticlesBoard;
