class RemoveUserImgColumnFromUsersTable < ActiveRecord::Migration
  def change
    remove_column :users, :user_img
  end
end
