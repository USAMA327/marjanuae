import type { FromSchema } from 'json-schema-to-ts';
import * as schemas from './schemas';

export type AuthenticatePayerV2BodyParam = FromSchema<typeof schemas.AuthenticatePayerV2.body>;
export type AuthenticatePayerV2Response200 = FromSchema<typeof schemas.AuthenticatePayerV2.response['200']>;
export type AuthenticatePayerV2Response400 = FromSchema<typeof schemas.AuthenticatePayerV2.response['400']>;
export type InitiateAuthenticationV2BodyParam = FromSchema<typeof schemas.InitiateAuthenticationV2.body>;
export type InitiateAuthenticationV2Response200 = FromSchema<typeof schemas.InitiateAuthenticationV2.response['200']>;
export type InitiateAuthenticationV2Response400 = FromSchema<typeof schemas.InitiateAuthenticationV2.response['400']>;
export type PayV2BodyParam = FromSchema<typeof schemas.PayV2.body>;
export type PayV2Response200 = FromSchema<typeof schemas.PayV2.response['200']>;
export type PayV2Response400 = FromSchema<typeof schemas.PayV2.response['400']>;
