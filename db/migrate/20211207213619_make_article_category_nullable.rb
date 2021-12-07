# frozen_string_literal: true

class MakeArticleCategoryNullable < ActiveRecord::Migration[6.1]
  def change
    change_column_null :articles, :category_id, true
  end
end
