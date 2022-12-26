echo Start deploy
ssh -A $SSH_HOST -p $SSH_PORT 'cd Shan-bot && git pull --rebase '
ssh $SSH_HOST -p $SSH_PORT "docker stop shanbot"
ssh $SSH_HOST -p $SSH_PORT "cd Shan-bot && npm run docker:build && npm run docker:start"
echo End deploy