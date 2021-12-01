# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_category, only: %i[create]

  def index
    @articles = Article.all
  end

  def create
    article = @category.articles.new(article_params)
    if article.save
      render status: :ok, json: { notice: "Successfully created Article" }
    else
      error = article.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: error }
    end
  end

  private

    def article_params
      params.require(:article).permit(:title, :category_id, :content, :status)
    end

    def load_category
      @category = Category.find_by(id: article_params[:category_id])
      unless @category
        render status: :not_found, json: { error: "Category not found" }
      end
    end
end
