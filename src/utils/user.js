export const saveUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export const removeUser = () => {
  localStorage.removeItem('user');
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
