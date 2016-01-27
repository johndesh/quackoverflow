class CreateQuestionAnswers < ActiveRecord::Migration
  def change
    create_table :question_answers do |t|
      t.text :body, null: false
      t.integer :author_id, null: false, index: true
      t.integer :question_id, null: false, index: true

      t.timestamps null: false
    end
  end
end
