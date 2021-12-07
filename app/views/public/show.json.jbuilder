# frozen_string_literal: true

json.article do
  json.extract! @article, :title, :id, :content
  json.date @article.created_at.strftime("%d %B, %Y")
  json.category @article.category, :name
end
