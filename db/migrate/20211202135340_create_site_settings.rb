# frozen_string_literal: true

class CreateSiteSettings < ActiveRecord::Migration[6.1]
  def change
    create_table :site_settings do |t|
      t.text :name, null: false
      t.text :password_digest
      t.timestamps
    end
  end
end
