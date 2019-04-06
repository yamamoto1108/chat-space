class GroupsController < ApplicationController

	def new
	end

	def create
		Group.create
		redirect_to root_path
	end

	def edit
	end

	def update
		if current_group.update(group_params)
			redirect_to root_path
		else
			render :edit
		end
	end

	private

	def group_params
		params.permit(:group).permit(:name)
	end

end
