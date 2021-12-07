# frozen_string_literal: true

class AddPositionValuesToCategories < ActiveRecord::Migration[6.1]
  def change
    Category.all.each_with_index do |category, index|
      category.update_columns(position: index + 1)
    end
  end
end
