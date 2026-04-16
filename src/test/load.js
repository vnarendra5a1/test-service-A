const results = {};

async function submit() {
  const random = Math.floor(100000000 + Math.random() * 900000000);
  const proposalNo = `C${random}`;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const initTime = Date.now();
  const raw = JSON.stringify({
    proposalNo,
    status: "SUBMIT",
    proposalDetails: {
      submitTimeStamp: Date.now(),
      proposalNo,
    },
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    "http://localhost:4010/proposal/submit",
    requestOptions,
  );
  const resObj = await response.text();
  const result = JSON.stringify(resObj);
  const responseTime = Date.now();
  results[proposalNo] = {
    proposalNo,
    initTime,
    responseTime,
    timeTakenToProcessReq: responseTime - initTime,
  };
}

async function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function startScript() {
  for (var i = 0; i < 100; i++) await submit();
}
startScript();
