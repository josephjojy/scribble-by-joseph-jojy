import React, { useState, useEffect } from "react";

import { Edit, Delete, Plus } from "@bigbinary/neeto-icons";
import { Table, Button, Checkbox, Typography } from "@bigbinary/neetoui/v2";
import { Dropdown } from "@bigbinary/neetoui/v2";
import { SubHeader } from "@bigbinary/neetoui/v2/layouts";
import Logger from "js-logger";

import articlesApi from "../../apis/articles";

const ArticleTable = ({ selectedCategory, selectedStatus }) => {
  const [articles, setArticles] = useState([]);
  const [columns, setColumns] = useState({
    Title: true,
    Date: true,
    Author: true,
    Category: true,
    Status: true,
  });
  const [searchString, setSearchString] = useState("");
  const style = {
    color: "rgba(99, 102, 241)",
  };

  const COLUMNDATA = Object.keys(columns)
    .filter(column => columns[column])
    .map(column => ({
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

  const ROWDATA = articles
    .filter(article => {
      let status = true,
        category = true;
      if (selectedCategory) category = selectedCategory === article.category;

      if (selectedStatus !== "All") status = selectedStatus === article.status;

      return (
        status &&
        category &&
        article.title.toLowerCase().includes(searchString.toLowerCase())
      );
    })
    .map(article => ({
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

  const handleChecked = (name, e) => {
    setColumns(column => ({
      ...column,
      [name]: e.target.checked,
    }));
  };

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
          value: searchString,
          onChange: e => setSearchString(e.target.value),
        }}
        actionBlock={
          <>
            <Dropdown
              label="Columns"
              buttonStyle="secondary"
              buttonProps={{
                size: "large",
              }}
              closeOnSelect={false}
            >
              <div className="space-y-4 px-4 py-2">
                <Typography style="h4">Columns</Typography>
                {Object.keys(columns).map((column, index) => (
                  <Checkbox
                    key={index}
                    checked={columns[column]}
                    id={column}
                    label={column}
                    style={style}
                    onChange={e => handleChecked(column, e)}
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
