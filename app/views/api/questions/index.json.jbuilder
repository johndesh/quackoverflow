json.array! @questions do |question|
  json.title question.title
  json.body question.body
  json.author question.author
  json.created_at question.created_at.strftime("%A, %b %y %Y")
end
