# frozen_string_literal: true

json.articles @articles do |article|
  json.extract! article, :title, :created_at, :status
  json.category article.category.name
end
