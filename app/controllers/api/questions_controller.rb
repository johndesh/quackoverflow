class Api::QuestionsController < ApplicationController

  def index
    questions = Question.all
    if !filter || filter == ''
      questions = questions.includes(:views).order(created_at: :desc)
    else
      questions =
        questions.
          select("questions.*, count(question_#{filter}.id) AS #{filter}_count").
          joins(filter.to_sym).
          group('questions.id, question_views.id, question_answers.id, users.id, authors_questions.id').
          includes(filter.to_sym).
          order("#{filter}_count DESC")
    end
    @questions = questions.includes({:answers => :author}, :author)
    render 'api/questions/index'
  end

  def show
    @question = Question.includes({:answers => :author}, :author, :views).find(params[:id])
    if current_user && !current_user.viewed_questions.include?(@question)
      @question.views.create(user_id: current_user.id) unless @question.author == current_user
    end
    @question
  end

  def create
    @question = Question.new(question_params)
    @question.author_id = current_user.id

    if @question.save
      render 'api/questions/show'
    else
      render json: {errors: @question.errors.full_messages}
    end
  end

  def update
    @question = Question.find(params[:id])
    @question.update(question_params)

    render 'api/questions/show'
  end


  def destroy
  end


  private
    def question_params
      params.require(:question).permit(:title, :body)
    end

    def filter
      params[:filter]
    end
end
