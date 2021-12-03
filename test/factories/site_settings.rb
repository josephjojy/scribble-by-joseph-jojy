# frozen_string_literal: true

FactoryBot.define do
  factory :site_setting do
    name { Faker::Lorem.sentence }
  end
end
