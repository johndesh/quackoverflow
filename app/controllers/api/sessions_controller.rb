class Api::SessionsController < ApplicationController
  def show
    if current_user
      @user = current_user
      render "api/users/show"
    else
      render json: {}
    end
  end

  def create
    @user = User.find_by_credentials(
      params[:username],
      params[:password]
    )

    if @user
      log_in!(@user)
      render "api/users/show"
    else
      render json: ["Wrong username or password"], status: 401
    end
  end

  def destroy
    sign_out!
  end

end
