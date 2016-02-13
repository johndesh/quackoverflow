class Api::QuestionsController < ApplicationController

  def index
    questions = Question.includes(:views, {:answers => :author}, :author).
                          select("questions.*", "COALESCE(vote_count, 0) as vote_count").
                          joins(<<-SQL)
                            LEFT OUTER JOIN (
                              SELECT 
                                votes.*, SUM(votes.value) AS vote_count 
                              FROM 
                                votes 
                              GROUP BY 
                                votes.id
                            ) AS foo 
                            ON 
                              questions.id = foo.votable_id
                          SQL
    if filter == 'views'
      questions = questions.order(question_views_count: :desc)
    elsif filter == 'votes'
      questions = questions.order('vote_count DESC')
    else
      questions = questions.order(created_at: :desc)
    end
    @questions = questions
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

    def filter
      params[:filter]
    end
end
