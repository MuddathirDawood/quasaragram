const express = require('express')
require('dotenv').config()
const fireadmin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json')

fireadmin.initializeApp({
  credential: fireadmin.credential.cert(serviceAccount)
})

const db = fireadmin.firestore()
const app = express()

app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.listen(process.env.PORT, ()=>{
  console.log(`Server listening at port ${process.env.PORT}`);
})

app.get('/posts', (req,res)=>{
  let posts = []
  db.collection('posts').orderBy('date', 'desc').get()
  .then(snapshot => {
    snapshot.forEach((doc) => {
      posts.push(doc.data())
    })
    res.json({
      status: 200,
      posts: posts
    })
  })
})
