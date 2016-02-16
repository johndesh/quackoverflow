json.array! @users do |user|
  json.cache! user do
  	json.partial! "user", user: user
  end
end
