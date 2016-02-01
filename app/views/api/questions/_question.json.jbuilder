json.extract! question, :id, :title, :body, :created_at
json._answerCount question.answers.size
json.answers question.answers do |answer|
  json.author do
    json.id answer.author.id
    json.username answer.author.username
  end
  json.answered time_ago_in_words(answer.created_at)
end
json.author do
  json.id question.author.id
  json.username question.author.username
  json.avatar question.author.avatar.url()
end
json.views question.views.size
