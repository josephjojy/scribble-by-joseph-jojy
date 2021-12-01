# frozen_string_literal: true

json.articles @articles do |article|
  json.extract! article, :title, :status
  json.category article.category.name
  json.date article.created_at.to_date.to_formatted_s(:long_ordinal)
  json.author "Oliver Smith"
end
