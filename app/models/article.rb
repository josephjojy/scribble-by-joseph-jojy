# frozen_string_literal: true

class Article < ApplicationRecord
  enum status: { Draft: 0, Published: 1 }

  belongs_to :category

  validates :title, presence: true
  validates :status, presence: true
  validates :content, presence: true
end
