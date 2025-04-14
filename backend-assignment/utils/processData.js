function processPipelineData(data) {
  // Initialize result arrays to store processed data by count and ACV
  const resultByCount = [];
  const resultByACV = [];

  // Initialize variables to calculate totals for lost, come to stage, and moved to next values
  let totalLostCount = 0;
  let totalComeToStageCount = 0;
  let totalMovedToNextCount = 0;

  let totalLostACV = 0;
  let totalComeToStageACV = 0;
  let totalMovedToNextACV = 0;

  // Find the 'Won' stage in the data to get ACV and count values for further calculations
  const wonStage = data.find(stage => stage.label === 'Won');
  const wonACV = Math.round(wonStage?.acv || 0);
  const wonCount = Math.round(wonStage?.count || 0);

  // Loop through each stage in the pipeline data
  for (let i = 0; i < data.length; i++) {
    const current = data[i];  // Current stage
    const next = data[i + 1]; // Next stage

    // ----------- COUNT BASED ------------

    // Get the count of records that came to this stage and calculate moved and lost counts
    const comeToStageCount = Math.round(current.count);
    const movedToNextCount =
      current.label === 'Won' ? comeToStageCount : next ? Math.round(next.count) : 0;
    const lostOrDisqualifiedCount = comeToStageCount - movedToNextCount;

    // Calculate the win rate for count (percentage of won over the total that came to this stage)
    const winRateCount = comeToStageCount
      ? Math.round((wonCount / comeToStageCount) * 100)
      : 0;

    // Add the processed count data to resultByCount
    resultByCount.push({
      stage: current.label,
      comeToStage: comeToStageCount,
      lostOrDisqualified: lostOrDisqualifiedCount,
      movedToNext: movedToNextCount,
      winRatePercent: winRateCount
    });

    // Update totals for count-based values
    totalComeToStageCount += comeToStageCount;
    totalMovedToNextCount += movedToNextCount;
    totalLostCount += lostOrDisqualifiedCount;

    // ----------- ACV BASED --------------

    // Get the ACV for this stage and calculate similar metrics for ACV
    const comeToStageACV = Math.round(current.acv);
    const movedToNextACV =
      current.label === 'Won' ? comeToStageACV : next ? Math.round(next.acv) : 0;
    const lostOrDisqualifiedACV = comeToStageACV - movedToNextACV;

    // Calculate the win rate for ACV (percentage of won ACV over the total ACV that came to this stage)
    const winRateACV = comeToStageACV
      ? Math.round((wonACV / comeToStageACV) * 100)
      : 0;

    // Add the processed ACV data to resultByACV
    resultByACV.push({
      stage: current.label,
      comeToStage: comeToStageACV,
      lostOrDisqualified: lostOrDisqualifiedACV,
      movedToNext: movedToNextACV,
      winRatePercent: winRateACV
    });

    // Update totals for ACV-based values
    totalComeToStageACV += comeToStageACV;
    totalMovedToNextACV += movedToNextACV;
    totalLostACV += lostOrDisqualifiedACV;
  }

  // Add total row for COUNT table with accumulated totals
  resultByCount.push({
    stage: 'Total',
    comeToStage: totalComeToStageCount,
    lostOrDisqualified: totalLostCount,
    movedToNext: totalMovedToNextCount,
    winRatePercent: totalComeToStageCount
      ? Math.round((wonCount / totalComeToStageCount) * 100)
      : ''
  });

  // Add total row for ACV table with accumulated totals
  resultByACV.push({
    stage: 'Total',
    comeToStage: totalComeToStageACV,
    lostOrDisqualified: totalLostACV,
    movedToNext: totalMovedToNextACV,
    winRatePercent: totalComeToStageACV
      ? Math.round((wonACV / totalComeToStageACV) * 100)
      : ''
  });

  // Return the results for both the count-based and ACV-based tables
  return {
    stageByCount: resultByCount,
    stageByACV: resultByACV
  };
}

module.exports = { processPipelineData };
