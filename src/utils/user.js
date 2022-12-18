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

export const recommendationCase = [
  {
    filename: "C990.txt",
    data: "Case law, also used interchangeably with common law, is law that is based on precedents, that is the judicial decisions from previous cases, rather than law based on constitutions, statutes, or regulations. Case law uses the detailed facts of a legal case that have been resolved by courts or similar tribunals. These past decisions are called case law, or precedent. Stare decisis—a Latin phrase meaning let the decision stand—is the principle by which judges are bound to such past decisions, drawing on established judicial authority to formulate their positions.",
    similarity: "0.9356605410575867",

  }
  ,{
    
    filename: "C991.txt",
    data: "In the common law tradition, courts decide the law applicable to a case by interpreting statutes and applying precedents which record how and why prior cases have been decided. Unlike most civil law systems, common law systems follow the doctrine of stare decisis, by which most courts are bound by their own previous decisions in similar cases. According to stare decisis, all lower courts should make decisions consistent with the previous decisions of higher courts.",
    similarity: "0.9077318906784058",

  },{
    
    filename: "C992.txt",
    data: "Generally speaking, higher courts do not have direct oversight over the lower courts of record, in that they cannot reach out on their initiative (sua sponte) at any time to overrule judgments of the lower courts. Normally, the burden rests with litigants to appeal rulings (including those in clear violation of established case law) to the higher courts. If a judge acts against precedent, and the case is not appealed, the decision will stand.",
    similarity: "0.9068414568901062",

  },{
    
    filename: "C993.txt",
    data: "The different roles of case law in civil and common law traditions create differences in the way that courts render decisions. Common law courts generally explain in detail the legal rationale behind their decisions, with citations of both legislation and previous relevant judgments, and often interpret the wider legal principles. The necessary analysis (called ratio decidendi), then constitutes a precedent binding on other courts; further analyses not strictly necessary to the determination of the current case are called obiter dicta, which constitute persuasive authority but are not technically binding. By contrast, decisions in civil law jurisdictions are generally shorter, referring only to statutes",
    similarity: "0.8979899287223816",

  }
]
