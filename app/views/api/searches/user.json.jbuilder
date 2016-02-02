json.results @search_results.map do |user|
  json.partial! "api/users/user", user: user
end
