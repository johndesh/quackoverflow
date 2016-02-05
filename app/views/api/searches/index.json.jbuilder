json.partial! 'api/questions/questions', questions: @search_results.map(&:searchable)
