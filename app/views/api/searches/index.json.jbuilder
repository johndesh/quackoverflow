json.results @search_results.map(&:searchable) do |model|
	if model.class == User
		json.partial! "api/users/user", user: model
	else
		json.partial! "api/questions/question", question: model
	end
end