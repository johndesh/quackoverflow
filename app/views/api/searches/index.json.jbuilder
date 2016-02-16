json.results @search_results.map(&:searchable) do |res|
  json.cache! res do
	json.partial! 'searches', question: res
  end
end