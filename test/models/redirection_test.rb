# frozen_string_literal: true

require "test_helper"

class RedirectionTest < ActiveSupport::TestCase
  def setup
    @redirection = create(:redirection)
  end

  def test_from_url_should_be_unique
    test = @redirection.dup
    assert test.invalid?
    assert_includes test.errors.full_messages, "From url has already been taken"
  end
end
