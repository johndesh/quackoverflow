json.extract! question, :id, :title, :body, :created_at
json._answerCount question.answers.size
json.answers question.answers do |answer|
  json.author answer.author, :username
  json.answered time_ago_in_words(answer.created_at)
end
json.author question.author, :username
json.views question.views.size
