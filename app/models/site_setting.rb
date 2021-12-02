# frozen_string_literal: true

class SiteSetting < ApplicationRecord
  has_secure_password :password, validations: false

  validates :name, presence: true
end
