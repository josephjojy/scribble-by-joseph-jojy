# frozen_string_literal: true

class PublicController < ApplicationController
  before_action :load_article, only: %i[show]
  before_action :authenticate_user_using_x_auth_token, only: %i[show]

  def index
    render
  end

  def show
    render
  end

  private

    def load_article
      @article = Article.find_by(slug: params[:slug])
      unless @article
        render status: :not_found, json: { error: t("not_found", entity: "Article") }
      end
    end

    def authenticate_user_using_x_auth_token
      auth_token = request.headers["X-Auth-Token"].presence
      site_setting = SiteSetting.first

      if auth_token &&
        ActiveSupport::SecurityUtils.secure_compare(
          site_setting.authentication_token, auth_token
        )
      else
        render status: :unauthorized, json: { error: t("session.could_not_auth") }
      end
    end
end
