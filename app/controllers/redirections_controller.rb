# frozen_string_literal: true

class RedirectionsController < ApplicationController
  def index
    redirections = Redirection.all
    render status: :ok, json: { redirections: redirections }
  end
end
