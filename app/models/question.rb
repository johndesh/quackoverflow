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

  after_touch :expire_caches
  after_update :expire_caches
  after_save :expire_caches

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


  def self.filter_cached(filter)
  	if filter == 'views'
      Rails.cache.fetch('Question.interesting') { with_votes.order(question_views_count: :desc) }
    elsif filter == 'votes'
      Rails.cache.fetch('Question.hot') { with_votes.order('vote_count DESC') }
    else
			Rails.cache.fetch('Question.recent') { with_votes.order(created_at: :desc) }
    end
  end

  def expire_caches
  	Rails.cache.delete('Question.interesting')
  	Rails.cache.delete('Question.hot')
  	Rails.cache.delete('Question.recent')
  end
end