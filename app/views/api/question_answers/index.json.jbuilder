json.array! @answers do |answer|
  json.body answer.body
  json.author do
    json.id answer.author.id
    json.username answer.author.username
  end
  json.answered time_ago_in_words(answer.created_at)
  json.modified time_ago_in_words(answer.updated_at)
end
