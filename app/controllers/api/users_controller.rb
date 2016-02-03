class Api::UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
  end

  def index
    @users = User.all
  end

  def create
    @user = User.new(user_params)

    if @user.save
      log_in!(@user)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 401
    end
  end

  def update
    @user = User.find(params[:id])

    @user.update!(user_params)

    render 'api/users/show'
  end

  private
    def user_params
      params.require(:user).permit(:username, :email, :password, :avatar)
    end

end
