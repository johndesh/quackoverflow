class AddViewsCountAndVotesCountToQuestions < ActiveRecord::Migration
  def change
    add_column :questions, :question_views_count, :integer, default: 0
  end
end
