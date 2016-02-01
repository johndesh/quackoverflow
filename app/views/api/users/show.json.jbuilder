json.extract! @user, :id, :username, :email
json.avatar @user.avatar.url()
