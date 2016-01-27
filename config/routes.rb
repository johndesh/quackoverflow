Rails.application.routes.draw do
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:show, :index]
    resources :questions, only: [:show, :index, :create, :update, :destroy] do
      resources :question_answers, only: [:index, :show, :create], path: "/answers", as: :answers
    end

  end

  root to: 'static_pages#root'
end
