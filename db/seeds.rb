# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


example = User.create!(username: 'exampleuser', email: 'fake@example.com', password: 'password')

guest = User.create!(username: 'guest', email: 'guest@fake.com', password: 'password')
users = []
5.times do |n|
  users << User.create!(username: "user#{n}", email: "user#{n}@email.com", password: 'password')
end

guest.questions.create!(title: "Database config for Rails Heroku deployment?", body: "Can't get my database.yml to play nice with Heroku, any ideas?")

users[1].questions.create!(title: "Avoid n+1 queries in Rails", body: "How can I avoid querying the DB excessively?")

example.questions.create!(title: "How do you answer questions on QuackOverflow?", body: "Trying to figure out how to answer on QuackOverflow?!?!?")

example.questions[0].answers.create!(body: "Like this!", author_id: users[0].id)
example.questions[0].answers.create!(body: "Or this...", author_id: users.last.id)

users[1].questions.first.answers.create!(body: "Use .includes() with an association to reduce queries.", author_id: example.id)

Question.first.views.create(user_id: example.id)

Question.last.views.create(user_id: example.id)
Question.last.views.create(user_id: users.first.id)