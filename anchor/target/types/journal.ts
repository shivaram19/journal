/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/journal.json`.
 */
export type Journal = {
  "address": "CfmG8r7sSPKYVx5uSw4dwyY6PrkLjGjz7KmME7dVjjMw",
  "metadata": {
    "name": "journal",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createEntry",
      "discriminator": [
        248,
        207,
        142,
        242,
        66,
        162,
        150,
        16
      ],
      "accounts": [
        {
          "name": "journalEntry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "title"
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "message",
          "type": "string"
        }
      ]
    },
    {
      "name": "deleteEntry",
      "discriminator": [
        227,
        198,
        83,
        191,
        70,
        23,
        194,
        58
      ],
      "accounts": [
        {
          "name": "journalEntry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "title"
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        }
      ]
    },
    {
      "name": "updateEntry",
      "discriminator": [
        70,
        47,
        181,
        2,
        1,
        40,
        2,
        92
      ],
      "accounts": [
        {
          "name": "journalEntry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "title"
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "newMessage",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "journalEntryState",
      "discriminator": [
        113,
        86,
        110,
        124,
        140,
        14,
        58,
        66
      ]
    }
  ],
  "types": [
    {
      "name": "journalEntryState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "message",
            "type": "string"
          },
          {
            "name": "entryid",
            "type": "u64"
          }
        ]
      }
    }
  ]
};
