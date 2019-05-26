Rails.application.routes.draw do
  devise_for :users
  resources :users, only: %i[index edit update]
  resources :groups, only: %i[index new create edit update] do
    resources :messages, only: %i[index create]
    namespace :api do
      resources :messages, only: :index, defaults: { format: 'json' }
    end
  end
  root 'groups#index'
end
