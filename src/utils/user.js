export const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const removeUser = () => {
  localStorage.removeItem("user");
};

// Example method for summarizing text
export const summarization_example = async (client) => {
  const documents = [
    `The extractive summarization feature uses natural language processing techniques to locate key sentences in an unstructured text document. 
        These sentences collectively convey the main idea of the document. This feature is provided as an API for developers. 
        They can use it to build intelligent solutions based on the relevant information extracted to support various use cases. 
        In the public preview, extractive summarization supports several languages. It is based on pretrained multilingual transformer models, part of our quest for holistic representations. 
        It draws its strength from transfer learning across monolingual and harness the shared nature of languages to produce models of improved quality and efficiency.`,
  ];

  console.log("== Analyze Sample For Extract Summary ==");

  const actions = {
    extractSummaryActions: [
      { modelVersion: "latest", orderBy: "Rank", maxSentenceCount: 5 },
    ],
  };
  const poller = await client.beginAnalyzeActions(documents, actions, "en");

  // poller.onProgress(() => {
  //   console.log(
  //     `Number of actions still in progress: ${
  //       poller.getOperationState().actionsInProgressCount
  //     }`
  //   );
  // });

  // console.log(
  //   `The analyze actions operation created on ${
  //     poller.getOperationState().createdOn
  //   }`
  // );

  // console.log(
  //   `The analyze actions operation results will expire on ${
  //     poller.getOperationState().expiresOn
  //   }`
  // );

  // const resultPages = await poller.pollUntilDone();

  // for await (const page of resultPages) {
  //   const extractSummaryAction = page.extractSummaryResults[0];
  //   if (!extractSummaryAction.error) {
  //     for (const doc of extractSummaryAction.results) {
  //       console.log(`- Document ${doc.id}`);
  //       if (!doc.error) {
  //         console.log("\tSummary:");
  //         for (const sentence of doc.sentences) {
  //           console.log(`\t- ${sentence.text}`);
  //         }
  //       } else {
  //         console.error("\tError:", doc.error);
  //       }
  //     }
  //   }
  // }
};
