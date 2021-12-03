# frozen_string_literal: true

class RedirectionsController < ApplicationController
  before_action :load_redirection, only: %i[destroy update]

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

  def destroy
    if @redirection.destroy
      render status: :ok, json: { notice: t("successfull_task", entity: "Redirection", task: "deleted") }
    else
      error = @redirection.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: error }
    end
  end

  def update
    if @redirection.update(redirection_params)
      render status: :ok, json: { notice: t("successfull_task", entity: "Redirection", task: "updated") }
    else
      error = @redirection.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: error }
    end
  end

  private

    def redirection_params
      params.require(:redirection).permit(:from_url, :to_url)
    end

    def load_redirection
      @redirection = Redirection.find_by_id(params[:id])
      unless @redirection
        render status: :not_found, json: { error: t("not_found", entity: "Redirection") }
      end
    end
end
