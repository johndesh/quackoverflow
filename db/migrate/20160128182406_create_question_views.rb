class CreateQuestionViews < ActiveRecord::Migration
  def change
    create_table :question_views do |t|
      t.integer :question_id, null: false
      t.integer :user_id, null: false

      t.timestamps null: false
    end
    add_index :question_views, [:question_id, :user_id], unique: true
  end
end
