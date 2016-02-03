Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:show, :index, :create, :update]
    resource :session, only: [:create, :destroy, :show]
    resources :questions, only: [:show, :index, :create, :update, :destroy] do
      resources :question_answers, only: [:index, :show, :create], path: "/answers", as: :answers
    end
    get "search", to: "searches#index"
    get "search/users", to: "searches#user"
  end

  get '*foo' => 'static_pages#root'

end
