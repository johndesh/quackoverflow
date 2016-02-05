class AddColumnValueToTableVotes < ActiveRecord::Migration
  def change
    add_column :votes, :value, :integer, default: 0
  end
end
