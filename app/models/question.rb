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
  scope :views_count, -> { order(question_views_count: :desc) }
  scope :votes_count, -> { select('questions.*, sum(votes.value) as votes_count').joins('INNER JOIN votes ON questions.id = votes.votable_id').group('questions.id').order('votes_count DESC') }




end
