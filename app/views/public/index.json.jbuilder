# frozen_string_literal: true

json.categories Category.order(:position).each do |category|
  json.extract! category, :name, :id
  json.articles category.articles.where(status: 1) do |article|
    json.extract! article, :title, :id, :slug
  end
end
