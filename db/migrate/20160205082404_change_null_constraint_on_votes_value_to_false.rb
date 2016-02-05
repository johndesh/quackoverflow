class ChangeNullConstraintOnVotesValueToFalse < ActiveRecord::Migration
  def change
    change_column :votes, :value, :integer, null: false
  end
end
