const express = require('express')
require('dotenv').config()
const fireadmin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json')
const inspect = require('util').inspect
const Busboy = require('busboy')
const { uid } = require('quasar')
const path = require('path')
const os = require('os')
const fs = require('fs')
const UUID = require('uuid-v4')

fireadmin.initializeApp({
  credential: fireadmin.credential.cert(serviceAccount),
  storageBucket: "quasaragram.appspot.com"
})

const db = fireadmin.firestore()
const bucket = fireadmin.storage().bucket()
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

app.post('/createPosts', (req,res)=>{
  console.log('POST request');

  const bb = Busboy({ headers: req.headers });

  let uuid = UUID()
  let fields = {}
  let fileData = {}

  bb.on('file', (name, file, info) => {
    const { filename, encoding, mimeType } = info;
    console.log(`File [${name}]: filename: %j, encoding: %j, mimeType: %j`,filename,encoding,mimeType);

    // file.on('data', (data) => {
    //   console.log(`File [${name}] got ${data.length} bytes`);
    // }).on('close', () => {
    //   console.log(`File [${name}] done`);
    // });

    let filepath = path.join(os.tmpdir(), filename)
    file.pipe(fs.createWriteStream(filepath))
    fileData = { filepath, mimeType }

  });

  bb.on('field', (name, val, info) => {
    console.log(`Field [${name}]: value: %j`, val);
    fields[name] = val
  });

  bb.on('close', () => {
    bucket.upload(
      fileData.filepath,
      {
        uploadType: 'media',
        metadata:{
          metadata: {
            contentType: fileData.mimeType,
            firebaseStorageDownloadTokens: uuid
          }
        }
      },
      (err, uploadedFile) => {
        if (!err) {
          createDocument(uploadedFile)
        }
      }
    )

    function createDocument(uploadedFile){
      db.collection('posts').doc(fields.id).set({
        id: fields.id,
        caption: fields.caption,
        location: fields.location,
        date: parseInt(fields.date),
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${ bucket.name }/o/${ uploadedFile.name }?alt=media&token=${ uuid }`
      })
      .then(() => {
        res.json({
          status: 200,
          msg: 'Post Added: ' + fields.id
        })
      })
    }
  });

  req.pipe(bb);
  // res.json({
  //   status: 200,
  //   msg: 'Successfully created post'
  // })
})
