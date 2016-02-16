json.array!(@search_results) do |res|
  json.cache! res do
	json.partial! 'searches', question: res.searchable
  end
end