#!/bin/bash

BACKEND_URL="http://localhost:8000/api/users/create" 

## Create users
## Delete all users
curl -X "DELETE" "http://localhost:8000/api/users/"

curl -X "POST" $BACKEND_URL\
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $"{\"email\": \"user1@lh.com\", \"password\": \"testtest\", \"username\": \"user1\", \"fullName\": \"Fabio Makepeace\" }"
curl -X "POST" $BACKEND_URL\
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $"{\"email\": \"user2@lh.com\", \"password\": \"testtest\", \"username\": \"user2\", \"fullName\": \"Chaunce McKirdy\" }"
curl -X "POST" $BACKEND_URL\
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $"{\"email\": \"user3@lh.com\", \"password\": \"testtest\", \"username\": \"user3\", \"fullName\": \"Merline Hintzer\" }"
curl -X "POST" $BACKEND_URL\
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $"{\"email\": \"user4@lh.com\", \"password\": \"testtest\", \"username\": \"user4\", \"fullName\": \"Louise Mitchell\" }"
curl -X "POST" $BACKEND_URL\
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $"{\"email\": \"user5@lh.com\", \"password\": \"testtest\", \"username\": \"user5\", \"fullName\": \"Kerwinn Menezes\" }"
