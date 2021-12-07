# frozen_string_literal: true

Rails.application.routes.draw do
  resources :categories, only: %i[index create destroy update]

  resources :articles, only: %i[index create destroy show update]

  resource :site_settings, only: %i[show update]

  resources :redirections, only: %i[index create destroy update]

  post "/categories/reorder", to: "categories#update_position"

  root "home#index"
  get "*path", to: "home#index", via: :all
end
