import React, { useState, useEffect } from "react";

import { Edit, Delete, Plus } from "@bigbinary/neeto-icons";
import { Table, Button, Checkbox, Typography } from "@bigbinary/neetoui/v2";
import { Dropdown } from "@bigbinary/neetoui/v2";
import { SubHeader } from "@bigbinary/neetoui/v2/layouts";
import Logger from "js-logger";

import articlesApi from "../../apis/articles";

const ArticleTable = () => {
  const [articles, setArticles] = useState([]);
  const style = {
    color: "rgba(99, 102, 241)",
  };

  const COLUMNS = ["Title", "Date", "Author", "Category", "Status"];

  const COLUMNDATA = COLUMNS.map(column => ({
    dataIndex: column.toLowerCase(),
    key: column,
    title: column,
  }));

  COLUMNDATA.push({
    dataIndex: "edit_delete",
    key: "edit_delete",
    render: () => (
      <>
        <Button icon={() => <Delete />} style="text" />
        <Button icon={() => <Edit />} style="text" />
      </>
    ),
  });

  const ROWDATA = articles.map(article => ({
    title: article.title,
    date: new Date(article.created_at).toLocaleString("en-us", {
      month: "long",
      year: "numeric",
      day: "numeric",
    }),
    author: "Oliver Smith",
    category: article.category,
    status: article.status,
  }));

  const fetchArticles = async () => {
    try {
      const respsonse = await articlesApi.index();
      const { articles } = await respsonse.data;
      setArticles(articles);
    } catch (error) {
      Logger.error(error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="flex flex-col overflow-auto my-8 mx-8 space-y-4">
      <SubHeader
        className="justify-end space-x-8 pr-8"
        searchProps={{
          placeholder: "Search Article Title",
        }}
        actionBlock={
          <>
            <Dropdown
              label="Columns"
              buttonStyle="secondary"
              buttonProps={{
                size: "large",
              }}
            >
              <div className="space-y-4 px-4 py-2">
                <Typography style="h4">Columns</Typography>
                {COLUMNS.map((column, index) => (
                  <Checkbox
                    key={index}
                    checked
                    id={column}
                    label={column}
                    style={style}
                  />
                ))}
              </div>
            </Dropdown>
            <Button
              label="Add New Article"
              style="primary"
              size="large"
              icon={() => <Plus size={20} className="ml-2" />}
              className="bg-indigo-500 text-white"
            />
          </>
        }
      />

      <Typography>13 Articles</Typography>

      <Table
        className="odd:bg-gray-100"
        rowSelection={false}
        columnData={COLUMNDATA}
        rowData={ROWDATA}
      />
    </div>
  );
};

export default ArticleTable;
