class Api::VotesController < ApplicationController

  def create
    type = (vote_target == :question_id ? Question : QuestionAnswer)
    target = params[vote_target]

    vote = Vote.create(user_id: current_user.id, votable_type: type, votable_id: target, value: vote_value)
    render json: {questionId: params[:question_id], vote: {user_id: vote.user_id, votable_type: vote.votable_type, votable_id: vote.votable_id, value: vote.value}}
  end

  private
    def vote_target
      if params[:answer_id]
        target = :answer_id
      else
        target = :question_id
      end

      target
    end

    def vote_value
      params.require(:vote).permit(:value)[:value]
    end
end
