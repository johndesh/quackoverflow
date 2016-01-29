class SessionsController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password],
    )

    if @user
      log_in!(@user)
      redirect_to root_url
    else
      render :new
    end
  end

  def destroy
    log_out!(@user)
    redirect_to new_session_url
  end

end
