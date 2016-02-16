json.array!(@search_results.map(&:searchable)) do |question|
  json.cache! question do
    json.partial! "searches", question: question
  end
end
