class QuestionView < ActiveRecord::Base
	validates :question_id, :user_id, presence: true
	validates :user_id, uniqueness: { scope: :question_id }

	belongs_to :question
	belongs_to :user


end
