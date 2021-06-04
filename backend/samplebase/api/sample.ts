import { FileQuery } from "../interfaces/fileQuery"

const send = require('koa-send');

import { _File } from "../interfaces/_file"
import { Sample } from "../interfaces/sample";
import { SampleQuery } from "../interfaces/sampleQuery";
import { formatDiagnosticsWithColorAndContext } from "typescript";
const { SampleModel } = require('../mongoModels/sample')
const mongo = require('mongodb');
var router = require('koa-router')();
const multer = require('@koa/multer');
const fs = require('fs');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('hello?')
    cb(null, '/home/joshua/uploads');
  },
  filename: function (req, file, cb) {
    console.log('received file ', file)
    cb(null, file.fieldname);
  }
});
// const upload = multer({ storage });
const upload = multer({ storage:storage});

let sampleUrl = '/api/sample/'



router.post(sampleUrl + 'update', async ctx => {
  console.log('update sample', ctx.request.body)
  const newSampleData = ctx.request.body
  try {
    await SampleModel.updateOne({ _id: newSampleData._id }, newSampleData, { upsert: true })
    ctx.body = { status: 'ok' };
  } catch (error) {
    console.log(error)
    ctx.body = { status: 'error', error: error };
    ctx.status = 500;
  }
})


router.post(sampleUrl + 'getavailablesamplefiles', async ctx  => {
  try {
    const data = await querySample(ctx.request.body)
    let availableFiles =  data[0].files
    ctx.body = { status: 'ok', files: availableFiles };
  } catch (error) {
    ctx.body = { status: 'error', error: error };
    ctx.status = 500;
  }
})

router.post(sampleUrl + 'updatesamplefile', async ctx => {
  console.log('update files of sample', ctx.request.body)
  const _id = ctx.request.body._id;
  const files = ctx.request.body.files;
  try {
    await SampleModel.updateOne({ _id: _id }, { $set: { files: files } }, { upsert: true })
    ctx.body = { status: 'ok' };
  } catch (error) {
    console.log(error)
    ctx.body = { status: 'error', error: error };
    ctx.status = 500;
  }
})

router.post(sampleUrl + 'filedownload', async ctx => {

  console.log('download request ', ctx.request.body)

  try {
    
    let file_path = 'home/joshua/uploads/' + ctx.request.body.fileId;
    console.log('requested file ', file_path)
    const stats = await send(ctx, file_path, {root: '/'})
    if (!ctx.status) ctx.throw(404)
    }
  catch (error) {
    console.error(error)
    ctx.body = { status: 'error', error: error };
    ctx.status = 500;
  }
})


// upload.single() needs an identifier??
router.post(sampleUrl + 'singleFileUpload',  upload.any(), ctx => {
    console.log('uploaded', ctx.request.body)
    ctx.body = { status: 'ok' };
})

router.post(sampleUrl + 'query', async ctx => {
  try {
    console.log('received sample query', ctx.request.body)
    const data = await querySample(ctx.request.body)
    console.log('sending sample query result: ', data)
    ctx.body = { status: 'ok', samples: data };
  } catch (error) {
    ctx.body = { status: 'error', error: error };
    ctx.status = 500;
  }
})

router.post(sampleUrl + 'remove', async ctx => {
  try {
    await SampleModel.deleteOne(ctx.request.body);
    ctx.body = { status: 'ok' };
  }
  catch (error) {
    ctx.body = { status: 'error', error: error }; //todo check the reason for failing deletion: nonexisting, 
    ctx.status = 500;
  }
})

const querySample = async function (sampleQuery: SampleQuery): Promise<[Sample]> {
  return SampleModel.find(sampleQuery).exec()
}


module.exports = router