class ApplicationController < ActionController::API
    include ActionController::Cookies
    include ActionController::MimeResponds

    def fallback_index_html
        respond_to do |format|
            format.html { render body: Rails.root.join('public/index.html').read }
        end
    end
end
