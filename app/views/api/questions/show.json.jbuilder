json.extract! @question, :id, :title, :body, :created_at

json.answers @question.answers do |answer|
  json.body answer.body
  json.author do
    json.username answer.author.username
    json.avatar answer.author.avatar.url()
  end
  json.answered time_ago_in_words(answer.created_at)
  json.modified time_ago_in_words(answer.updated_at)
end
json.author do
  json.username @question.author.username
  json.avatar @question.author.avatar.url()
end
json.views @question.views.length
