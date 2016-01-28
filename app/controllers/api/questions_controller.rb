class Api::QuestionsController < ApplicationController

  def index
    @questions = Question.includes({:answers => :author}, :author, :views).all
  end

  def show
    @question = Question.includes(:answers, :author, :views).find(params[:id])
    puts current_user
    if current_user && !current_user.viewed_questions.include?(@question)
      @question.views.create(user_id: current_user.id)
    end
    @question
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
