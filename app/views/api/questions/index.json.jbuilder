json.array! @questions do |question|
  json.title question.title
  json.body question.body
  json.author question.author, :username, :user_img
  json.created_at question.created_at.strftime("%A, %b %y %Y")
end
