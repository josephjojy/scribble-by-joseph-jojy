# frozen_string_literal: true

json.article do
  json.extract! @article, :title, :status, :id, :category_id, :content
  json.category @article.category
end
