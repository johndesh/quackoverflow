class Api::QuestionAnswersController < ApplicationController
  def index
    @answers = QuestionAnswer.includes(:author).all
  end

  def show
    @answer = QuestionAnswer.find(params[:id])
  end

  def create
    @answer = QuestionAnswer.new(answer_params)
    @answer.author_id = logged_in? ? current_user.id : guest_user.id

    @answer.save
    @question = @answer.question

    render 'api/questions/show'
  end

  def update

  end


  def destroy
  end


  private
    def answer_params
      params.require(:question_answer).permit(:body, :question_id)
    end
end
