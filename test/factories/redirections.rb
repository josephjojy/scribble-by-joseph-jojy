# frozen_string_literal: true

FactoryBot.define do
  factory :redirection do
    from_url { Faker::Lorem.sentence }
    to_url { Faker::Lorem.sentence }
  end
end
