#!/bin/bash

# Loop 15 times and execute 'ping https://random-word-api.herokuapp.com/word?length=15'
for i in {1..15}
do
  curl https://random-word-api.herokuapp.com/word?length=15 && echo "" &
done
