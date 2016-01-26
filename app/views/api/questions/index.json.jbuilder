json.array! @questions do |question|
  json.title question.title
  json.body question.body
  json.author question.author, :username
  json.asked time_ago_in_words(question.created_at)
  json.modified time_ago_in_words(question.updated_at)
end
