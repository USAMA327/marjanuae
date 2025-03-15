import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'cherry-smart-router/unknown (api/6.1.3)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * Initiate Authentication
   *
   * @throws FetchError<400, types.InitiateAuthenticationV2Response400> 400
   */
  initiateAuthenticationV2(body: types.InitiateAuthenticationV2BodyParam): Promise<FetchResponse<200, types.InitiateAuthenticationV2Response200>> {
    return this.core.fetch('/v6/direct/authenticate/initiate', 'post', body);
  }

  /**
   * Authenticate Payer
   *
   * @throws FetchError<400, types.AuthenticatePayerV2Response400> 400
   */
  authenticatePayerV2(body: types.AuthenticatePayerV2BodyParam): Promise<FetchResponse<200, types.AuthenticatePayerV2Response200>> {
    return this.core.fetch('/v6/direct/authenticate/payer', 'post', body);
  }

  /**
   * Pay
   *
   * @throws FetchError<400, types.PayV2Response400> 400
   */
  payV2(body: types.PayV2BodyParam): Promise<FetchResponse<200, types.PayV2Response200>> {
    return this.core.fetch('/v2/direct/pay', 'post', body);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { AuthenticatePayerV2BodyParam, AuthenticatePayerV2Response200, AuthenticatePayerV2Response400, InitiateAuthenticationV2BodyParam, InitiateAuthenticationV2Response200, InitiateAuthenticationV2Response400, PayV2BodyParam, PayV2Response200, PayV2Response400 } from './types';
