# frozen_string_literal: true

class Category < ApplicationRecord
  has_many :articles, dependent: :nullify

  after_create :set_position

  validates :name, presence: true

  def self.update_position(items)
    items.each do |item|
      Category.find_by_id(item[:id]).update(position: item[:position])
    end
  end

  private

    def set_position
      update(position: self.id)
    end
end
