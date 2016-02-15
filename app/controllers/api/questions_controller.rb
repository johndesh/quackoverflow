class Api::QuestionsController < ApplicationController

  def index
    in_cache = Rails.cache.read('Question.with_votes')

    @questions = in_cache ? in_cache : Question.with_votes_cached

  end
  
  def filter
    @questions = Question.with_votes_cached
    if filter_params == 'views'
      in_cache = Rails.cache.read('Question.interesting')
      if in_cache
        @questions = in_cache
      else
        @questions = @questions.interesting
      end
    elsif filter_params == 'votes'
      in_cache = Rails.cache.read('Question.hot')
      if in_cache
        @questions = in_cache
      else
        @questions = @questions.hot
      end
    else
      in_cache = Rails.cache.read('Question.recent')
      if in_cache
        @questions = in_cache
      else
        @questions = @questions.recent
      end
    end

    render 'api/questions/index'
  end


  def show
    @question = Question.includes({:answers => :author},{:answers => :votes}, :author).find(params[:id])
    if current_user && !@question.viewers.include?(current_user)
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

    def filter_params
      params[:filter]
    end
end
