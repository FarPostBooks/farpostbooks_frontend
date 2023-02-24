import {
  createJsonQuery,
  createJsonMutation,
  declareParams,
  SourcedField,
  Json,
} from '@farfetched/core'
import { runtypeContract } from '@farfetched/runtypes'
import { Runtype } from 'runtypes'
import { $$session } from './model'

export const createAuthorizedQuery = <Params, Contract>({
  url,
  contract,
  method,
}: {
  url: ((params: Params) => string) | string
  contract: Runtype<Contract>
  method: 'GET' | 'DELETE' | 'POST' | 'PUT'
}) => {
  return createJsonQuery({
    params: declareParams<Params>(),
    request: {
      headers: {
        source: $$session.$token,
        fn: (_, source) => ({
          Authorization: `${source?.token_type} ${source?.access_token}`,
        }),
      },
      method,
      url,
    },
    response: {
      contract: runtypeContract(contract),
    },
  })
}

export const createAuthorizedMutation = <Params, Contract>({
  url,
  contract,
  method,
  successCode,
  body,
}: {
  url: SourcedField<Params, string, void>
  contract: Runtype<Contract>
  method: 'GET' | 'DELETE' | 'POST' | 'PUT'
  successCode?: number
  body?: SourcedField<Params, Json, void>
}) => {
  return createJsonMutation({
    params: declareParams<Params>(),
    request: {
      headers: {
        source: $$session.$token,
        fn: (_, source) => ({
          Authorization: `${source?.token_type} ${source?.access_token}`,
        }),
      },
      method,
      body,
      url,
    },
    response: {
      contract: runtypeContract(contract),
      status: { expected: successCode ?? 200 },
    },
  })
}
