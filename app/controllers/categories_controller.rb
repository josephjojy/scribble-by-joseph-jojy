# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :load_category, only: %i[destroy update]

  def index
    categories = Category.all.order(:position)
    render status: :ok, json: { categories: categories }
  end

  def create
    category = Category.new(category_params)
    if category.save
      render status: :ok, json: { notice: t("successfull_task", entity: "Category", task: "created") }
    else
      error = category.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: error }
    end
  end

  def destroy
    if @category.destroy
      render status: :ok, json: { notice: t("successfull_task", entity: "Category", task: "deleted") }
    else
      error = @category.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: error }
    end
  end

  def update
    if @category.update(category_params)
      render status: :ok, json: { notice: t("successfull_task", entity: "Category", task: "updated") }
    else
      error = @category.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: error }
    end
  end

  def update_position
    @category = Category.update_position(update_position_params[:reorder])
    unless @category
      error = @category.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: error }
    end
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end

    def load_category
      @category = Category.find_by_id(params[:id])
      unless @category
        render status: :not_found, json: { error: t("not_found", entity: "Category") }
      end
    end

    def update_position_params
      params.require(:category).permit(reorder: [:id, :position])
    end
end
