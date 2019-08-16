#!/bin/bash

set -e

mongo <<EOF
db.getSiblingDB('$MONGO_INITDB_DATABASE')
db.createUser({
  user: 'siosa_user',
  pwd: 'password',
  roles: [{
    role: 'readWrite',
    db: 'local'
  }],
   mechanisms: [ "SCRAM-SHA-1" ]
})
EOF
