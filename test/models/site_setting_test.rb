# frozen_string_literal: true

require "test_helper"

class SiteSettingTest < ActiveSupport::TestCase
  def setup
    @site_setting = create(:site_setting)
  end

  def test_name_cannot_be_empty
    @site_setting.name = nil
    assert @site_setting.invalid?
    assert_includes @site_setting.errors.full_messages, "Name can't be blank"
  end
end
