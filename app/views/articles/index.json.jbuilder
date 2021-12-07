# frozen_string_literal: true

json.articles @articles do |article|
  json.extract! article, :title, :status, :id
  json.category article.category_id ? article.category.name : "-"
  json.category_id article.category_id
  json.date article.Published? ? article.updated_at.to_date.to_formatted_s(:long_ordinal) : "-"
  json.author "Oliver Smith"
end
