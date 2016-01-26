class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.string :title, null: false
      t.text :body, null: false
      t.integer :author_id, null: false, index: true

      t.timestamps null: false
    end
  end
end
