Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:show, :index, :create, :update]
    resource :session, only: [:create, :destroy, :show]
    resources :questions, except: [:edit, :new] do
      collection do
        get "filter"
      end
      resources :votes, only: [:create, :destroy], path: "/vote", as: :votes
      resources :question_answers, only: [:index, :show, :create], path: "/answers", as: :answers do
        resources :votes, only: [:create, :destroy], path: "/vote", as: :votes
      end
    end
    get "search", to: "searches#index"
    get "search/users", to: "searches#user"
  end

  get '*path' => 'static_pages#root'

end
