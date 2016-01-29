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
      params[:email],
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
    if current_user
      log_out!
    end
    render json: {}
  end

end
