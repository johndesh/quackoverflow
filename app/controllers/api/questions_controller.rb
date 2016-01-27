class Api::QuestionsController < ApplicationController

  def index
    @questions = Question.includes({:answers => :author}, :author).all
  end

  def show
    @question = Question.includes(:answers, :author).find(params[:id])
  end

  def create
    @question = Question.new(question_params)
    @question.author_id = current_user.id

    @question.save

    render json: @question
  end

  def update

  end


  def destroy
  end


  private
    def question_params
      params.require(:question).permit(:title, :body)
    end
end
