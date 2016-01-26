class AddUserImgColumnToUsersTable < ActiveRecord::Migration
  def change
    add_column :users, :user_img, :string
  end
end
