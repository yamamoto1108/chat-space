Rails.application.routes.draw do
  devise_for :users
  resources :users, only: [:edit, :update]
  resources :groups, only: [:new, :create, :edit, :update]
  root 'messages#index'
end
