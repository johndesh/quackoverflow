class SessionsController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.new(
      params[:user][:username],
      params[:user][:email],
      params[:user][:password],
    )

    if @user.save
      log_in!(@user)
      redirect_to user_url(@user)
    else
      render :new
    end
  end

  def destroy
    log_out!(@user)
    redirect_to new_session_url
  end

end
