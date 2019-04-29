class Api::MessagesController < ApplicationController
  def index
    @group = Group.find(params[:group_id])
    respond_to do |format|
      format.html
      format.json{@messages = @group.messages.where('id > ?', params[:id])}  #ajaxで渡されたlast_message_idより大きい値のidを持つmessageを取得
    end
  end
end
