echo Start deploy
ssh $SSH_HOST -p $SSH_PORT 'pm2 delete Shanbot'
ssh -A $SSH_HOST -p $SSH_PORT 'cd Shan-bot && git pull --rebase '
ssh $SSH_HOST -p $SSH_PORT 'cd Shan-bot && npm ci && npm run build'
ssh $SSH_HOST -p $SSH_PORT 'cd Shan-bot && node -v'
# ssh $SSH_HOST -p $SSH_PORT 'cd Shan-bot && pm2 start --name Shanbot npm -- run start'
echo End deploy