import React from "react";

import { Edit, Delete, Plus } from "@bigbinary/neeto-icons";
import { Table, Button, Checkbox, Typography } from "@bigbinary/neetoui/v2";
import { Dropdown } from "@bigbinary/neetoui/v2";
import { SubHeader } from "@bigbinary/neetoui/v2/layouts";

const ArticleTable = () => {
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
        rowData={[
          {
            title: "Welcome to Scribble",
            date: "November 10th, 2021",
            author: "Oliver Smith",
            category: "Getting Started",
            status: "Draft",
          },
          {
            title: "Setting Up",
            date: "November 9th, 2021",
            author: "Oliver Smith",
            category: "Getting Started",
            status: "Published",
          },
          {
            title: "Redirection",
            date: "November 9th, 2021",
            author: "Oliver Smith",
            category: "App Integration",
            status: "Published",
          },
          {
            title: "Finance",
            date: "November 9th, 2021",
            author: "Oliver Smith",
            category: "Misc",
            status: "Draft",
          },
          {
            title: "Password",
            date: "November 9th, 2021",
            author: "Oliver Smith",
            category: "Misc",
            status: "Published",
          },
          {
            title: "Typography",
            date: "November 8th, 2021",
            author: "Oliver Smith",
            category: "Misc",
            status: "Draft",
          },
        ]}
      />
    </div>
  );
};

export default ArticleTable;
