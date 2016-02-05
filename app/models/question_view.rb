class QuestionView < ActiveRecord::Base
	validates :question_id, :user_id, presence: true
	validates :user_id, uniqueness: { scope: :question_id }

	belongs_to :question, counter_cache: true
	belongs_to :user


end
