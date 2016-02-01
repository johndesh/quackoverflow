json.array! @questions do |question|
  json.id question.id
  json.title question.title
  json.body question.body
  json.author do
    json.id question.author.id
    json.username question.author.username
    json.avatar question.author.avatar.url()
  end
  json.asked time_ago_in_words(question.created_at)
  json.modified time_ago_in_words(question.updated_at)
  json.answers question.answers do |answer|
    json.body answer.body
    json.author answer.author, :id, :username
    json.answered time_ago_in_words(answer.created_at)
    json.modified time_ago_in_words(answer.updated_at)
  end
  json.views question.views.length
end
