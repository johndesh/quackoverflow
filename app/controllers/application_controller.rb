class ApplicationController < ActionController::Base

  protect_from_forgery with: :exception
  helper_method :current_user, :logged_in?


  def current_user
    @current_user ||= User.find_by_session_token(session[:token])
  end

  def guest_user
    @guest_user ||= User.find_by_username("guest")
  end

  def logged_in?
    !!current_user
  end

  def log_in!(user)
    user.reset_session_token
    session[:token] = user.session_token
  end

  def log_out!
    current_user.reset_session_token
    session[:token] = nil
  end

  def ensure_user_logged_in
    unless current_user
      render json: ["Not logged in."]
    end
  end
end
