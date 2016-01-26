json.extract! @question, :title, :body, :created_at
json.author @question.author, :username, :user_img
