const axios = require('axios');

const {
  POST_CREATE_TRANSACTION,
  GET_TRANSACTION,
  PATCH_COMMENT_ON_STATUS,
  DELETE_TRANSACTION,
  GET_ALL_CLIENT_TRANSACTIONSS,
  GET_ALL_USER_TRANSACTIONS,
  GET_ALL_NODE_TRANSACTIONS,
} = require('../constants/apiReqNames');

const staticEndpoints = require('../constants/staticEndpoints');
const buildHeaders = require('../helpers/buildHeaders');
const { addQueryParams, replacePathParams } = require('../helpers/urlBuilders');

module.exports[POST_CREATE_TRANSACTION] = ({
  from_node_id,
  to_node_id,
  to_node_type,
  amount,
  currency,
  optionalBodyParams,
  userInfo,
}) => {
  const { oauth_key, host, user_id, fingerprint, ip_address } = userInfo;

  let extra = {};
  if (optionalBodyParams !== undefined) {
    if (optionalBodyParams.extra !== undefined) {
      extra = optionalBodyParams.extra;
    }
  }

  return axios.post(
    replacePathParams({
      originalUrl: `${host}${staticEndpoints[POST_CREATE_TRANSACTION]}`,
      user_id,
      node_id: from_node_id,
    }),
    {
      to: {
        type: to_node_type,
        id: to_node_id,
      },
      amount: {
        amount,
        currency,
      },
      extra: {
        ip: ip_address,
        extra: { ...extra },
      },
    },
    buildHeaders({
      fingerprint,
      ip_address,
      oauth_key,
    })
  );
};

module.exports[GET_TRANSACTION] = ({ node_id, trans_id, userInfo }) => {
  const { oauth_key, host, user_id, fingerprint, ip_address } = userInfo;

  return axios.get(
    replacePathParams({
      originalUrl: `${host}${staticEndpoints[GET_TRANSACTION]}`,
      user_id,
      node_id,
      trans_id,
    }),
    buildHeaders({
      fingerprint,
      ip_address,
      oauth_key,
    })
  );
};

module.exports[PATCH_COMMENT_ON_STATUS] = ({ node_id, trans_id, comment, userInfo }) => {
  const { oauth_key, host, user_id, fingerprint, ip_address } = userInfo;

  return axios.patch(
    replacePathParams({
      originalUrl: `${host}${staticEndpoints[PATCH_COMMENT_ON_STATUS]}`,
      user_id,
      node_id,
      trans_id,
    }),
    { comment },
    buildHeaders({
      fingerprint,
      ip_address,
      oauth_key,
    })
  );
};

module.exports[DELETE_TRANSACTION] = ({ node_id, trans_id, userInfo }) => {
  const { oauth_key, host, user_id, fingerprint, ip_address } = userInfo;

  return axios.delete(
    replacePathParams({
      originalUrl: `${host}${staticEndpoints[DELETE_TRANSACTION]}`,
      user_id,
      node_id,
      trans_id,
    }),
    buildHeaders({
      fingerprint,
      ip_address,
      oauth_key,
    })
  );
};
