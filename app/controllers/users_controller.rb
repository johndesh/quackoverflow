class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      log_in!(@user)
      redirect_to user_url(@user)
    else
      render :new
    end
  end

  def show
  end

  private
    def user_params
      params.require(:user).permit(:username, :email, :password)
    end
end
