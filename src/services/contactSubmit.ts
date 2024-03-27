import { to } from '@utility/awaitTo'
import isEmail from 'validator/lib/isEmail'
import { AwsClient } from 'aws4fetch'

export const verify = fields => {
  const errorBag = {}

  if (fields.firstName.length < 1) errorBag['firstName'] = 'First Name is required'
  if (fields.lastName.length < 1) errorBag['lastName'] = 'Last Name is required'
  if (fields.email.length < 1) errorBag['email'] = 'Email is required'
  if (!isEmail(fields.email)) errorBag['email'] = 'Email is not valid'
  if (fields.comment.length < 1) errorBag['comment'] = 'What did you have in mind? is required'

  return errorBag
}

export const sendNoty = async fields => {
  const PUB_KEY = import.meta.env.AWS_SES_PUB
  const SEC_KEY = import.meta.env.AWS_SES_SECRET
  const FromEmailAddress = import.meta.env.SES_FROM
  const toAddress = import.meta.env.NOTY_CONTACT_EMAIL

  if (!PUB_KEY || !SEC_KEY) {
    console.error('Cannot send email due to access keys missing in ENV')
    return
  }

  if (!FromEmailAddress) {
    console.error('Cannot send email due to from address missing in ENV')
    return
  }

  if (!toAddress) {
    console.error('Cannot send email due to to address missing in ENV')
    return
  }

  const aws = new AwsClient({ accessKeyId: PUB_KEY, secretAccessKey: SEC_KEY })
  const AWS_URL = 'https://email.us-east-2.amazonaws.com/v2/email/outbound-emails'
  const ToAddresses = [toAddress]
  const subject = 'Contact form was submitted!'
  const fieldsJson = JSON.stringify(fields, null, 4)
  const config = {
    body: JSON.stringify({
      FromEmailAddress,
      Content: {
        Simple: {
          Subject: {
            Charset: 'utf-8',
            Data: subject
          },
          Body: {
            Html: {
              Charset: 'utf-8',
              Data: `<h1>Contact form data:</h1><p><pre>${fieldsJson}</pre></p>`
            },
            Text: {
              Charset: 'utf-8',
              Data: `Contact form data:\r\n ${fieldsJson}`
            }
          }
        }
      },
      Destination: { ToAddresses }
    })
  }

  const { res, err } = await to(aws.fetch(AWS_URL, config))
  if (err) console.error('err sendNoty: ', err.message)

  const resJson = res ? await res.json() : res
  console.log('SES res: ', resJson)

  return {
    res: resJson,
    err
  }
}
