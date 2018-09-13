# Node Tests

---

- GET_ALL_USER_NODE
- GET_NODE
- POST_CREATE_NODE
- DELETE_NODE
- POST_ACH_WITH_LOGIN
- POST_ACH_WITH_MFA
- PATCH_UPDATE_NODE
- PATCH_REISSUE_DEBIT_CARD
- PATCH_REORDER_DEBIT_CARD
- POST_ACH_WITH_AC_RN
- PATCH_REINITIATE_MICRO_DEPOSIT
- PATCH_VERIFY_MICRO_DEPOSIT

---

- GET_ALL_USER_NODE
  - create default node node 1
  - create default node node 2
  - > get all nodes
  - `expect node legnth = 2`
  - delete 2 nodes

---

- GET_NODE
  - create node
  - > get node
  - `expect node type = "DEPOSIT-US"`
  - delete node

---

- POST_CREATE_NODE
```js
platformUserApiCannon
  .POST_CREATE_NODE({
    reqBody: {
      type: 'DEPOSIT-US',
      info: {
        nickname: 'My Checking',
      },
    },
  })
  .then({ data });
```

---

- DELETE_NODE
  - create node
  - > delete node 
  - `expect get all node length = 0`
  - delete node

---

- POST_ACH_WITH_LOGIN and POST_ACH_WITH_MFA
  - > create ACH with login
  - `expect mfa.access_token to be string`
  - > create ACH with mfa
  - `expect allowed "CREDIT-AND-DEBIT"`
  - `expect type = "ACH-US"`
  - delete node

---

- PATCH_UPDATE_NODE
  - create node with nickname = "Initial Nickname"
  - > update nickname = "Updated Nickname"
  - `expect nickname = "Updated Nickname`
  - delete node

---

- PATCH_REISSUE_DEBIT_CARD
  - create card (user status cannot be `UNVERIFIED`)
  - > reissue debit card
  - `expect end of timel line note to be "Debit Card Reissued"`
  - delete node

---

- PATCH_REORDER_DEBIT_CARD
  - create card (user status cannot be `UNVERIFIED`)
  - > reorder debit card
  - `expect end of timel line note to be "Debit Card Reordered"`
  - delete node

---

- POST_ACH_WITH_AC_RN && PATCH_REINITIATE_MICRO_DEPOSIT && PATCH_VERIFY_MICRO_DEPOSIT
  - > create ACH AC/RN -> get node_id
  - `expect allowed "CREDIT"`
  - `expect type "ACH-US"`
  - > resend micro deposit
  - `expect time line ot have "ACH-US"`
  - `expect 2 notes of "Micro deposit initiated"`
  - > verify micro deposit
  - `expect 2 notes of allowed "CREDIT-AND-DEBIT"`
  - delete node

---

helper
- delete node
- create deposit node with (nickname)

