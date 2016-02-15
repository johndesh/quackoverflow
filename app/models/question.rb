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
  
  scope :interesting, -> { order(question_views_count: :desc) }
  scope :hot, -> { order('vote_count DESC') }
  scope :recent, -> { order(created_at: :desc) }

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

  after_save :expire_with_votes_cache
  after_update :expire_with_votes_cache
  after_destroy :expire_with_votes_cache

  def self.with_votes_cached
    Rails.cache.fetch('Question.with_votes') { with_votes }
  end

  def expire_with_votes_cache
  	Rails.cache.delete('Question.with_votes')
  end
end