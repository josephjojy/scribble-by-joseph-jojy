# frozen_string_literal: true

class SiteSetting < ApplicationRecord
  has_secure_password :password, validations: false

  has_secure_token :authentication_token

  validates :name, presence: true
end
