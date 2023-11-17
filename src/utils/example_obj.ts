import { RuleJson, TaskInfo, TaskJson, VocabularyMetadata } from "@/types";

export const vocabularies: VocabularyMetadata[] = [
  {
    id: "6557fa61a688b03aaf95f72e",
    name: "SmarterVocabulary",
    vocabularyUrl:
      "jar:file:vocabularies/smarter-vocabulary-1.0-SNAPSHOT-shaded.jar!/",
    rootPackageName: "com.vocabularies.smarter",
    blockMetadata: {
      EndExecutionBlock: {
        label: "End execution",
        params: [],
      },
      AndBlock: {
        label: "E",
        params: [
          {
            classNameOpts: ["Block"],
          },
          {
            classNameOpts: ["Block"],
          },
        ],
      },
      HelloWorldBlock: {
        label: "hello world",
        params: [],
      },
      IsNumberBlock: {
        label: "is a number",
        params: [],
      },
      InsertedCardBlock: {
        label: "",
        params: [],
      },
      IsSymbolBlock: {
        label: "is a symbol",
        params: [],
      },
      OnLeftBlock: {
        label: "on left",
        params: [
          {
            classNameOpts: ["IsNumberBlock", "IsSymbolBlock"],
          },
        ],
      },
      RemovedCardBlock: {
        label: "removed card",
        params: [],
      },
      HelloWorld2Block: {
        label: "hello world",
        params: [],
      },
    },
  },
];

export const tasks: TaskJson[] = [
  {
    id: "6554ffee10da383f7fcdbf2e",
    name: "Task SmarterVocabulary v2",
    vocabularies: [
      {
        id: "6554ffe010da383f7fcdbf2d",
        name: "SmarterVocabulary",
        vocabularyUrl:
          "jar:file:vocabularies/smarter-vocabulary-1.0-SNAPSHOT-shaded.jar!/",
        rootPackageName: "com.vocabularies.smarter",
        blockMetadata: {
          EndExecutionBlock: {
            label: "End execution",
            params: [],
          },
          HelloWorldBlock: {
            label: "hello world",
            params: [],
          },
          IsNumberBlock: {
            label: "is a number",
            params: [],
          },
          InsertedCardBlock: {
            label: "",
            params: [],
          },
          OnLeftBlock: {
            label: "on left",
            params: [
              {
                classNameOpts: ["IsNumberBlock", "IsSymbolBlock"],
              },
            ],
          },
          IsSymbolBlock: {
            label: "is a symbol",
            params: [],
          },
          RemovedCardBlock: {
            label: "removed card",
            params: [],
          },
          HelloWorld2Block: {
            label: "hello world",
            params: [],
          },
        },
      },
    ],
    rules: [
      {
        id: "6555000b10da383f7fcdbf2f",
        name: "rule 2",
        condition: {
          name: "OnLeftBlock",
          vocabulary: {
            id: "6554ffe010da383f7fcdbf2d",
            name: "SmarterVocabulary",
            vocabularyUrl:
              "jar:file:vocabularies/smarter-vocabulary-1.0-SNAPSHOT-shaded.jar!/",
            rootPackageName: "com.vocabularies.smarter",
            blockMetadata: {
              EndExecutionBlock: {
                label: "End execution",
                params: [],
              },
              HelloWorldBlock: {
                label: "hello world",
                params: [],
              },
              IsNumberBlock: {
                label: "is a number",
                params: [],
              },
              InsertedCardBlock: {
                label: "",
                params: [],
              },
              OnLeftBlock: {
                label: "on left",
                params: [
                  {
                    classNameOpts: ["IsNumberBlock", "IsSymbolBlock"],
                  },
                ],
              },
              IsSymbolBlock: {
                label: "is a symbol",
                params: [],
              },
              RemovedCardBlock: {
                label: "removed card",
                params: [],
              },
              HelloWorld2Block: {
                label: "hello world",
                params: [],
              },
            },
          },
          params: [
            {
              name: "IsNumberBlock",
              vocabulary: {
                id: "6554ffe010da383f7fcdbf2d",
                name: "SmarterVocabulary",
                vocabularyUrl:
                  "jar:file:vocabularies/smarter-vocabulary-1.0-SNAPSHOT-shaded.jar!/",
                rootPackageName: "com.vocabularies.smarter",
                blockMetadata: {
                  EndExecutionBlock: {
                    label: "End execution",
                    params: [],
                  },
                  HelloWorldBlock: {
                    label: "hello world",
                    params: [],
                  },
                  IsNumberBlock: {
                    label: "is a number",
                    params: [],
                  },
                  InsertedCardBlock: {
                    label: "",
                    params: [],
                  },
                  OnLeftBlock: {
                    label: "on left",
                    params: [
                      {
                        classNameOpts: ["IsNumberBlock", "IsSymbolBlock"],
                      },
                    ],
                  },
                  IsSymbolBlock: {
                    label: "is a symbol",
                    params: [],
                  },
                  RemovedCardBlock: {
                    label: "removed card",
                    params: [],
                  },
                  HelloWorld2Block: {
                    label: "hello world",
                    params: [],
                  },
                },
              },
              params: [],
            },
          ],
        },
        actions: [
          {
            name: "HelloWorldBlock",
            vocabulary: {
              id: "6554ffe010da383f7fcdbf2d",
              name: "SmarterVocabulary",
              vocabularyUrl:
                "jar:file:vocabularies/smarter-vocabulary-1.0-SNAPSHOT-shaded.jar!/",
              rootPackageName: "com.vocabularies.smarter",
              blockMetadata: {
                EndExecutionBlock: {
                  label: "End execution",
                  params: [],
                },
                HelloWorldBlock: {
                  label: "hello world",
                  params: [],
                },
                IsNumberBlock: {
                  label: "is a number",
                  params: [],
                },
                InsertedCardBlock: {
                  label: "",
                  params: [],
                },
                OnLeftBlock: {
                  label: "on left",
                  params: [
                    {
                      classNameOpts: ["IsNumberBlock", "IsSymbolBlock"],
                    },
                  ],
                },
                IsSymbolBlock: {
                  label: "is a symbol",
                  params: [],
                },
                RemovedCardBlock: {
                  label: "removed card",
                  params: [],
                },
                HelloWorld2Block: {
                  label: "hello world",
                  params: [],
                },
              },
            },
            params: [],
          },
        ],
      },
    ],
  },
];

export const rules: RuleJson[] = [
  {
    id: "6555000b10da383f7fcdbf2f",
    name: "rule 2",
    condition: {
      name: "OnLeftBlock",
      vocabulary: {
        id: "6554ffe010da383f7fcdbf2d",
        name: "SmarterVocabulary",
        vocabularyUrl:
          "jar:file:vocabularies/smarter-vocabulary-1.0-SNAPSHOT-shaded.jar!/",
        rootPackageName: "com.vocabularies.smarter",
        blockMetadata: {
          EndExecutionBlock: {
            label: "End execution",
            params: [],
          },
          HelloWorldBlock: {
            label: "hello world",
            params: [],
          },
          IsNumberBlock: {
            label: "is a number",
            params: [],
          },
          InsertedCardBlock: {
            label: "",
            params: [],
          },
          OnLeftBlock: {
            label: "on left",
            params: [
              {
                classNameOpts: ["IsNumberBlock", "IsSymbolBlock"],
              },
            ],
          },
          IsSymbolBlock: {
            label: "is a symbol",
            params: [],
          },
          RemovedCardBlock: {
            label: "removed card",
            params: [],
          },
          HelloWorld2Block: {
            label: "hello world",
            params: [],
          },
        },
      },
      params: [
        {
          name: "IsNumberBlock",
          vocabulary: {
            id: "6554ffe010da383f7fcdbf2d",
            name: "SmarterVocabulary",
            vocabularyUrl:
              "jar:file:vocabularies/smarter-vocabulary-1.0-SNAPSHOT-shaded.jar!/",
            rootPackageName: "com.vocabularies.smarter",
            blockMetadata: {
              EndExecutionBlock: {
                label: "End execution",
                params: [],
              },
              HelloWorldBlock: {
                label: "hello world",
                params: [],
              },
              IsNumberBlock: {
                label: "is a number",
                params: [],
              },
              InsertedCardBlock: {
                label: "",
                params: [],
              },
              OnLeftBlock: {
                label: "on left",
                params: [
                  {
                    classNameOpts: ["IsNumberBlock", "IsSymbolBlock"],
                  },
                ],
              },
              IsSymbolBlock: {
                label: "is a symbol",
                params: [],
              },
              RemovedCardBlock: {
                label: "removed card",
                params: [],
              },
              HelloWorld2Block: {
                label: "hello world",
                params: [],
              },
            },
          },
          params: [],
        },
      ],
    },
    actions: [
      {
        name: "HelloWorldBlock",
        vocabulary: {
          id: "6554ffe010da383f7fcdbf2d",
          name: "SmarterVocabulary",
          vocabularyUrl:
            "jar:file:vocabularies/smarter-vocabulary-1.0-SNAPSHOT-shaded.jar!/",
          rootPackageName: "com.vocabularies.smarter",
          blockMetadata: {
            EndExecutionBlock: {
              label: "End execution",
              params: [],
            },
            HelloWorldBlock: {
              label: "hello world",
              params: [],
            },
            IsNumberBlock: {
              label: "is a number",
              params: [],
            },
            InsertedCardBlock: {
              label: "",
              params: [],
            },
            OnLeftBlock: {
              label: "on left",
              params: [
                {
                  classNameOpts: ["IsNumberBlock", "IsSymbolBlock"],
                },
              ],
            },
            IsSymbolBlock: {
              label: "is a symbol",
              params: [],
            },
            RemovedCardBlock: {
              label: "removed card",
              params: [],
            },
            HelloWorld2Block: {
              label: "hello world",
              params: [],
            },
          },
        },
        params: [],
      },
    ],
  },
];
