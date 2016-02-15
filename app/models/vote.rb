class Vote < ActiveRecord::Base
  validates :user_id, presence: true
  validates :user_id, uniqueness: {scope: [:votable_id]}
  validates :value, inclusion: { in: [-1, 1] }

  after_rollback :interpret_vote

  belongs_to :votable, polymorphic: true, touch: true, dependent: :destroy
  belongs_to :user, dependent: :destroy

private
  def interpret_vote
    if self.valid?
      return self
    else
      vote = Vote.find_by_votable_id_and_user_id(self.votable_id, self.user_id)
      Vote.destroy(vote.id) unless vote.value == self.value
    end
  end
end
