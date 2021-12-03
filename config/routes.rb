# frozen_string_literal: true

Rails.application.routes.draw do
  resources :categories, only: %i[index create]

  resources :articles, only: %i[index create destroy show update]

  resources :site_settings, only: %i[index update]

  resources :redirections, only: %i[index create]

  root "home#index"
  get "*path", to: "home#index", via: :all
end
