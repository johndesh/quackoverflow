json.extract! @user, :id, :username, :email
json.avatar image_path(@user.avatar.url())
