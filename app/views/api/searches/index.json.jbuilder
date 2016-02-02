json.results @search_results.map(&:searchable) do |model|
		json.partial! "api/questions/question", question: model
end
