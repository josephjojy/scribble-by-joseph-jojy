# frozen_string_literal: true

class SiteSettingsController < ApplicationController
  before_action :load_site_setting, only: %i[update]

  def index
    site_setting = SiteSetting.all
    render status: :ok, json: { site_setting: site_setting[0] }
  end

  def update
    if @site_setting.update(site_settings_params)
      render status: :ok, json: { notice: t("successfull_task", entity: "Site Settings", task: "updated") }
    else
      error = @site_setting.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: error }
    end
  end

  private

    def load_site_setting
      @site_setting = SiteSetting.find_by_id(params[:id])
      unless @site_setting
        render status: :not_found, json: { error: t("not_found", entity: "Site Settings") }
      end
    end

    def site_settings_params
      params.require(:site_setting).permit(:name, :password)
    end
end
