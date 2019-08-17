#!/bin/bash

set -e

mongo <<EOF
use $MONGO_DATABASE
db.createCollection('builds')
db.createUser({
  user: '$MONGO_USER',
  pwd: '$MONGO_PASSWORD',
  roles: [{
    role: 'readWrite',
    db: '$MONGO_DATABASE'
  }],
   mechanisms: [ "SCRAM-SHA-1" ]
})
EOF
