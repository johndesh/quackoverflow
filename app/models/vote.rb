class Vote < ActiveRecord::Base
  validates :user_id, presence: true
  validates :user_id, uniqueness: {scope: [:votable_id]}
  validates :value, inclusion: { in: -1..1 }

  belongs_to :votable, polymorphic: true
  belongs_to :user

end
