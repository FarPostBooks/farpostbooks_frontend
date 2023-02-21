import { createJsonQuery, declareParams } from '@farfetched/core'
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
