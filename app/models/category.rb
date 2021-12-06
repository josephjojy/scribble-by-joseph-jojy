# frozen_string_literal: true

class Category < ApplicationRecord
  has_many :articles

  after_create :set_position

  validates :name, presence: true

  private

    def set_position
      update(position: self.id)
    end
end
