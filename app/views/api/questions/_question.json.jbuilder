json.extract! question, :id, :title, :body, :created_at

json._answerCount question.answers.size
json.asked time_ago_in_words(question.created_at)
json.modified time_ago_in_words(question.updated_at)

json.views question.views.size
json.votes question.votes.sum(:value)

json.author do

  json.id question.author.id
  json.username question.author.username
  json.avatar question.author.avatar.url()

end

json.answers question.answers do |answer|
  json.votes answer.votes.length
  json.answered time_ago_in_words(answer.created_at)
  json.body answer.body

  json.author do
    json.id answer.author.id
    json.username answer.author.username
    json.avatar answer.author.avatar.url()
  end

end
