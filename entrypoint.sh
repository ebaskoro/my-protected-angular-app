#!/bin/sh

sed -i 's,BASE_API_URL,'"$BASE_API_URL"',g' /usr/share/nginx/html/*
sed -i 's,OAUTH_ISSUER,'"$OAUTH_ISSUER"',g' /usr/share/nginx/html/*
sed -i 's,OAUTH_CLIENT_ID,'"$OAUTH_CLIENT_ID"',g' /usr/share/nginx/html/*
sed -i 's,OAUTH_SCOPE,'"$OAUTH_SCOPE"',g' /usr/share/nginx/html/*

nginx -g 'daemon off;'
