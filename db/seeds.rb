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


users[0].questions.create!(title: "q-io: how to read response.body JSON object on an http request using Promises?", body: "I need to make an http request from one server to another server.")


users[2].questions.create!(title: "Scanning device fail android BLE", body: "I am trying to write an android app which is a chat app via BLE. when I check my devices specification, they support only buletooth smart, not peripheral mode. My question is that Is it possible to connect BLE supported moblie phone each other without peripheral mode supported? Or is my code just something wrong ?")

users[3].questions.create!(title: "Read UTF-8 file into UCS-4 string", body: "I am trying to read a UTF-8 encoded file into a UTF-32 (UCS-4) string. Basically internally I want a fixed size character internally to the application.\nHere I want to make sure the translation is done as part of the stream processes (because that is what the Locale is supposed to be used for). Alternative questions have been posted to do the translation on the string (but this is wasteful as you have to do a translation phase in memory then you have to do a second pass to send it to the stream). By doing it with the locale in the stream you only have to do a single pass and there is not requirement for a copy to made (assuming you want to maintain the original).")

users[4].questions.create!(title: "Traversing text in Insert mode", body: "While in Insert Mode in Vim, is there any way to traverse the text (like moving some characters forward and backward) other than using the arrow keys?")


Question.first.views.create(user_id: example.id)

Question.all[2].views.create(user_id: users[1].id)
Question.all[2].views.create(user_id: users[2].id)
Question.all[2].views.create(user_id: users[3].id)
Question.all[3].views.create(user_id: users[0].id)
Question.all[3].views.create(user_id: users[1].id)
Question.all[3].views.create(user_id: users[2].id)
Question.all[3].views.create(user_id: users[3].id)
Question.all[3].views.create(user_id: users[4].id)
Question.all[3].views.create(user_id: example.id)
Question.all[3].views.create(user_id: guest.id)

Question.last.views.create(user_id: example.id)
Question.last.views.create(user_id: users.first.id)
