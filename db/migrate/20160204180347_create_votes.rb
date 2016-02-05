class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.integer :user_id, null: false, index: true
      t.references :votable, polymorphic: true
      t.timestamps null: false
    end
    add_index :votes, [:votable_id, :user_id], unique: true
  end
end
