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
  
  scope :interesting, -> { Rails.cache.fetch('Question.interesting') { order(question_views_count: :desc) } }
  scope :hot, -> { Rails.cache.fetch('Question.hot') { order('vote_count DESC') } }
  scope :recent, -> { Rails.cache.fetch('Question.recent') { order(created_at: :desc) } }

  scope :with_votes, -> { includes(:views, {:answers => :author}, :author).
      										select("questions.*", "COALESCE(SUM(votes.value), 0) as vote_count").
                          joins(<<-SQL) }
                            LEFT OUTER JOIN
                              votes
                            ON
                              votes.votable_id = questions.id
                            GROUP BY
                              questions.id
                          SQL

  after_save :expire_caches
  after_update :expire_caches
  after_destroy :expire_caches

  def self.with_votes_cached
    Rails.cache.fetch('Question.with_votes') { with_votes }
  end

  def expire_caches
  	Rails.cache.delete('Question.with_votes')
  	Rails.cache.delete('Question.interesting')
  	Rails.cache.delete('Question.hot')
  	Rails.cache.delete('Question.recent')
  end
end