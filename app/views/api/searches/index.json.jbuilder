json.array!(@search_results.map(&:searchable)) do |question|
  json.cache! question do
    json.partial! "api/questions/questions", question: question
  end
end
