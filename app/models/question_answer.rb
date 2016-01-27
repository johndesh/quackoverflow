class QuestionAnswer < ActiveRecord::Base
  validates :body, :author_id, :question_id, presence: true

  belongs_to :question
  belongs_to :author, class_name: "User"
end
