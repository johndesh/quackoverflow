class VotesController < ApplicationController

  def create
    Target = vote_target == :question_id ? Question : QuestionAnswer
    target = Target.find(params[:vote][target])
    target.votes.create(user_id: current_user.id, value: vote_value)
    @question = target.is_a? Question ? target : target.question
    render 'api/questions/show'
  end

  private
    def vote_target
      if params[:vote][:answer_id]
        target = :answer_id
      else
        target = :question_id
      end

      target
    end

    def vote_value
      params.require(:vote).permit(:value)
    end
end
