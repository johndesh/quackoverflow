class Question < ActiveRecord::Base
  validates :title, :body, :author_id, presence: true

  belongs_to :author, class_name: "User"
  has_many :answers, class_name: "QuestionAnswer"
  has_many :views, class_name: "QuestionView"
end
