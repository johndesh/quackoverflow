json.results @search_results.map(&:searchable) do |question|
		json.partial! "api/questions/question", question: question
end
