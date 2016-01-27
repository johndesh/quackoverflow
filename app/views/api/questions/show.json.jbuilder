json.extract! @question, :title, :body, :created_at
json.answers @question.answers.size
json.author @question.author, :username, :user_img
