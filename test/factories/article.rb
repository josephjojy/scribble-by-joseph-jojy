# frozen_string_literal: true

FactoryBot.define do
  factory :article do
    category
    title { Faker::Lorem.sentence[0..49] }
    status { 0 }
    content { Faker::Lorem.paragraph }
  end
end
