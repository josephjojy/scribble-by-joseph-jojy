# frozen_string_literal: true

Rails.application.routes.draw do
  resources :categories, only: %i[index create]

  resources :articles, only: %i[index create destroy show update]

  root "home#index"
  get "*path", to: "home#index", via: :all
end
