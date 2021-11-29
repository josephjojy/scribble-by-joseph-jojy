# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def setup
    @category = create(:category)
  end

  def test_name_cannot_be_empty
    @category.name = nil
    assert @category.invalid?
    assert_includes @category.errors.full_messages, "Name can't be blank"
  end
end
