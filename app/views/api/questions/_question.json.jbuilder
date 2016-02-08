json.extract! question, :id, :title, :body, :created_at

json._answerCount question.answers.size
json.asked time_ago_in_words(question.created_at)
json.modified time_ago_in_words(question.updated_at)
if logged_in? && question.voters.include?(current_user)
  json.userVoteValue question.votes.find_by_user_id(current_user.id).value
else
  json.userVoteValue 0
end
json.views question.views.size
json.votes question.votes.sum(:value)

json.author do

  json.id question.author.id
  json.username question.author.username
  json.avatar question.author.avatar.url()

end

json.answers question.answers do |answer|
  json.id answer.id
  if logged_in? && answer.voters.include?(current_user)
    json.userVoteValue answer.votes.find_by_user_id(current_user.id).value
  else
    json.userVoteValue 0
  end
  json.votes answer.votes.sum(:value)
  json.answered time_ago_in_words(answer.created_at)
  json.body answer.body

  json.author do
    json.id answer.author.id
    json.username answer.author.username
    json.avatar answer.author.avatar.url()
  end

end
