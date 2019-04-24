json.id @message.id
json.body @message.body
json.image @message.image
json.user_id @message.user.id
json.group_id @message.group.id
json.created_at @message.created_at.strftime('%Y/%m/%d %H:%M')
json.user_name @message.user.name