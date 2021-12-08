# frozen_string_literal: true

class SessionsController < ApplicationController
  def create
    @site_setting = SiteSetting.first
    unless @site_setting.present? && @site_setting.authenticate(login_params[:password])
      render status: :unauthorized, json: { error: "Incorrect credentials, try again." }
    end
  end

  private

    def login_params
      params.require(:login).permit(:password)
    end
end
