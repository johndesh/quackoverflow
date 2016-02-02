class Api::SearchesController < ApplicationController

	def index
		@search_results = PgSearch
			.multisearch(params[:query]).includes(:searchable)
	end

	def user
		@search_results = User.search_users(params[:query])
	end

end
