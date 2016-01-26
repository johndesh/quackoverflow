# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


example = User.create!(username: 'exampleuser', email: 'fake@example.com', password: 'password')

guest = User.create!(username: 'guest', email: 'guest@fake.com', password: 'password')

guest.questions.create!(title: "Database config for Rails Heroku deployment?", body: "Can't get my database.yml to play nice with Heroku, any ideas?")

example.questions.create!(title: "How do you answer questions on QuackOverflow?", body: "Trying to figure out how to answer on QuackOverflow?!?!?")
