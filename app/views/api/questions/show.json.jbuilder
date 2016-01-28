json.extract! @question, :id, :title, :body, :created_at

json.answers @question.answers do |answer|
  json.body answer.body
  json.author answer.author, :username
  json.answered time_ago_in_words(answer.created_at)
  json.modified time_ago_in_words(answer.updated_at)
end
json.author @question.author, :username, :user_img
json.views @question.views.length