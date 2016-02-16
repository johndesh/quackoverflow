json._answerCount question.answers.size
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
json.votes question.votes.sum(:value)
