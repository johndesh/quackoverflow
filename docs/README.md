# QUACKoverflow

[Heroku link][heroku]

[heroku]: http://quack-overflow.herokuapp.com

## Minimum Viable Product

QUACKoverflow is a web application inspired by StackOverflow built using Ruby on Rails
and React.js. QUACKoverflow allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create an account
- [ ] Log in / Log out
- [ ] Create, read, edit, and delete questions
- [ ] Organize answers within questions.
- [ ] Tag questions with multiple tags and search questions by tag
- [ ] Search through questions for blocks of text
- [ ] Apply markup to questions/answers
- [ ] Allow users to vote questions and answers up or down

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./views.md
[schema]: ./schema.md

## Implementation Timeline

### Phase 1: User Authentication, Question Model and JSON API (1.5 days)

In Phase 1, I will begin by implementing user signup and authentication (using
BCrypt). There will be a basic landing page after signup that will contain the
container for the application's root React component. Before building out the
front end, I will begin by setting up a full JSON API for Notes.

[Details][phase-one]

### Phase 2: Flux Architecture and Question CRUD (2.5 days)

Phase 2 is focused on setting up Flux, the React Router, and the React view
structure for the main application. After the basic Flux architecture has been
set up, a Question store will be implemented and a set of actions corresponding to
the needed CRUD functionality created. Once this is done, I will create React
views for the Questions `Index`, `IndexItem` and `Form`. At the end of Phase 2,
Questions can be created, read, edited and destroyed in the browser. Questions should
save to the database when the form loses focus or is left idle after editing.
Lastly, while constructing the views I will start using css for
styling.

[Details][phase-two]

### Phase 3: QuestionAnswers and Tags (2 days)

Phase 3 adds answers to the Questions. Answers belong to a Question, and all answers to a question are displayed in the Question `Show` view. Create JSON API for Answers. Questions can also now be
tagged with multiple tags. Users can bring up questions in a separate `SearchIndex`
view by searching for their tags. Once the tag search is implemented, I will
extend this to a fuzzy search through every Question's content.

[Details][phase-three]

### Phase 4: Render Markdown in Questions/Answers (1 day)

Using the remarkable library (based on CommonMark), allow for markdown rendering
in Questions.

[Details][phase-four]

### Phase 5: Votes (1 day)

I'll implement the Vote feature which allows users to vote up or down any question
or answer. This will be used to order the answers on the question show page.

[Details][phase-five]


### Bonus Features (TBD)
- [ ] Prettify transitions
- [ ] Use javascript library for cleaner tag selection
- [ ] Allow different 'forums' for questions to be organized by (beyond tagging)


[phase-one]: ./phases/phase1.md
[phase-two]: ./phases/phase2.md
[phase-three]: ./phases/phase3.md
[phase-four]: ./phases/phase4.md
[phase-five]: ./phases/phase5.md
