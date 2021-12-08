# frozen_string_literal: true

json.site_setting do
  json.extract! @site_setting, :name
  json.hasPassword @site_setting.password_digest ? true : false
end
