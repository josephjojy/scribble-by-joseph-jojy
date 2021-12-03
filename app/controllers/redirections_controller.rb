# frozen_string_literal: true

class RedirectionsController < ApplicationController
  def index
    redirections = Redirection.all
    render status: :ok, json: { redirections: redirections }
  end

  def create
    redirection = Redirection.new(redirection_params)
    if redirection.save
      render status: :ok, json: { notice: t("successfull_task", entity: "Redirection", task: "created") }
    else
      error = redirection.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: error }
    end
  end

  private

    def redirection_params
      params.require(:redirection).permit(:from_url, :to_url)
    end
end
