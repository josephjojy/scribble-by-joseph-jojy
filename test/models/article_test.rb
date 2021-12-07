# frozen_string_literal: true

require "test_helper"

class ArticleTest < ActiveSupport::TestCase
  def setup
    @article = create(:article)
  end

  def test_article_should_have_title
    @article.title = nil
    assert @article.invalid?
    assert_includes @article.errors.full_messages, "Title can't be blank"
  end

  def test_article_should_have_content
    @article.content = nil
    assert @article.invalid?
    assert_includes @article.errors.full_messages, "Content can't be blank"
  end

  def test_article_should_have_status
    @article.status = nil
    assert @article.invalid?
    assert_includes @article.errors.full_messages, "Status can't be blank"
  end
end
