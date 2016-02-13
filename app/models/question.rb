class Question < ActiveRecord::Base
  include PgSearch
  multisearchable :against => [:title, :body]

  validates :title, :body, :author_id, presence: true

  belongs_to :author, class_name: "User"
  has_many :answers, class_name: "QuestionAnswer"
  has_many :views, class_name: "QuestionView"
  has_many :votes, as: :votable
  has_many :voters, through: :votes, source: :user
  has_many :viewers, through: :views, source: :user
  


end