# frozen_string_literal: true

class Redirection < ApplicationRecord
  validates :from_url, uniqueness: true
end
