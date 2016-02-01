json.extract! user, :id, :username, :email, :city, :country
json.avatar image_path(user.avatar.url())
