class QuestionAnswer < ActiveRecord::Base
  include PgSearch
  multisearchable :against => [:body]

  validates :body, :author_id, :question_id, presence: true

  belongs_to :question
  belongs_to :author, class_name: "User"

end
