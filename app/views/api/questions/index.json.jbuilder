json.array!(@questions) do |question|
  json.cache! question do
    json.partial! "questions", question: question
  end
end
