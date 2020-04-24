class MessagesController < ApplicationController

  def index
  end

  def edit
    redirect_to controller: groups, action: edit
  end

end
