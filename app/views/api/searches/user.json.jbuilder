json.results @search_results.map do |user|
  json.cache! user do
	json.partial! "api/users/user", user: user
  end
end
