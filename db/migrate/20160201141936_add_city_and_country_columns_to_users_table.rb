class AddCityAndCountryColumnsToUsersTable < ActiveRecord::Migration
  def change
    add_column :users, :city, :string
    add_column :users, :country, :string
  end
end
