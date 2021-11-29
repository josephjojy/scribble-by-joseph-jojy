# frozen_string_literal: true

class Article < ApplicationRecord
  enum status: { draft: 0, published: 1 }

  belongs_to :category

  validates :title, presence: true
  validates :status, presence: true
  validates :content, presence: true
end
