class Api::VotesController < ApplicationController

  def create
    type = (vote_target == :question_id ? Question : QuestionAnswer)
    target = params[vote_target]

    Vote.create(user_id: current_user.id, votable_type: type, votable_id: target, value: vote_value)

    @question = type.find(target)
    @question = @queston.question if type == QuestionAnswer
    render 'api/questions/show'
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
