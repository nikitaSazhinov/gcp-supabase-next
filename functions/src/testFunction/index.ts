import * as functions from 'firebase-functions';
import { DEFAULT_REGION } from '../constants';
import supabaseClient from '../common/supabaseClient';

interface TestFunctionInputType {
    test: string;
}

const testFunction = functions.region(DEFAULT_REGION).https.onCall(async (input: TestFunctionInputType) => {
  console.log('WELCOME TO THE FUNCTIONS');

  const { test } = input;

  if (!test) {
    throw new functions.https.HttpsError('invalid-argument', 'The function must be called with one argument');
  }



  return {
    message: 'Hello World',
    error: null,
  }
});

export default testFunction;

