import { SampleSet } from "../interfaces/sampleSet";
import { SampleSetQuery } from "../interfaces/sampleSetQuery";

const { SampleSetModel } = require('../mongoModels/sampleSet')

var router = require('koa-router')();

let sampleSetUrl = '/api/sample-set/'

router.post(sampleSetUrl + 'update', async ctx => {
  console.log('update sample set ', ctx.request.body)
  const newSampleSetData = ctx.request.body
  try {
    await SampleSetModel.updateOne({_id: newSampleSetData._id}, newSampleSetData, {upsert: true})
    ctx.body = { status: 'ok' };
  } catch (error) {
    console.log(error)
    ctx.body = { status: 'error', error: error };
    ctx.status = 500;
  }

})

router.post(sampleSetUrl + 'query', async ctx => {
  try {
    console.log('received sample set query ', ctx.request.body)
    const data = await querySampleSets(ctx.request.body)
    console.log('data form mongoDB: ',data)
    ctx.body = { status: 'ok', sampleSets: data };
  } catch (error) {
    ctx.body = { status: 'error', error: error };
    ctx.status = 500;
  }
})

router.delete(sampleSetUrl + 'remove', async ctx => {
  try {
    await SampleSetModel.deleteOne(ctx.request.body);
    ctx.body = { status: 'ok' };
  }
  catch (error) {
    ctx.body = { status: 'error', error: error }; //todo check the reason for failing deletion: nonexisting, 
    ctx.status = 500;
  }
})

const querySampleSets = async function (sampleSetQuery: SampleSetQuery): Promise<[SampleSet]> {
  return SampleSetModel.find(sampleSetQuery).exec()
}

module.exports = router