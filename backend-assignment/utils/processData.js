function processPipelineData(data) {
  const resultByCount = [];
  const resultByACV = [];

  let totalLostCount = 0;
  let totalComeToStageCount = 0;
  let totalMovedToNextCount = 0;

  let totalLostACV = 0;
  let totalComeToStageACV = 0;
  let totalMovedToNextACV = 0;

  // Get Won stage data for count and ACV
  const wonStage = data.find(stage => stage.label === 'Won');
  const wonACV = Math.round(wonStage?.acv || 0);
  const wonCount = Math.round(wonStage?.count || 0);

  for (let i = 0; i < data.length; i++) {
    const current = data[i];
    const next = data[i + 1];

    // ----------- COUNT BASED ------------
    const comeToStageCount = Math.round(current.count);
    const movedToNextCount =
      current.label === 'Won' ? comeToStageCount : next ? Math.round(next.count) : 0;
    const lostOrDisqualifiedCount = comeToStageCount - movedToNextCount;

    const winRateCount = comeToStageCount
      ? Math.round((wonCount / comeToStageCount) * 100)
      : 0;

    resultByCount.push({
      stage: current.label,
      comeToStage: comeToStageCount,
      lostOrDisqualified: lostOrDisqualifiedCount,
      movedToNext: movedToNextCount,
      winRatePercent: winRateCount
    });

    totalComeToStageCount += comeToStageCount;
    totalMovedToNextCount += movedToNextCount;
    totalLostCount += lostOrDisqualifiedCount;

    // ----------- ACV BASED --------------
    const comeToStageACV = Math.round(current.acv);
    const movedToNextACV =
      current.label === 'Won' ? comeToStageACV : next ? Math.round(next.acv) : 0;
    const lostOrDisqualifiedACV = comeToStageACV - movedToNextACV;

    const winRateACV = comeToStageACV
      ? Math.round((wonACV / comeToStageACV) * 100)
      : 0;

    resultByACV.push({
      stage: current.label,
      comeToStage: comeToStageACV,
      lostOrDisqualified: lostOrDisqualifiedACV,
      movedToNext: movedToNextACV,
      winRatePercent: winRateACV
    });

    totalComeToStageACV += comeToStageACV;
    totalMovedToNextACV += movedToNextACV;
    totalLostACV += lostOrDisqualifiedACV;
  }

  // Add total row for COUNT table
  resultByCount.push({
    stage: 'Total',
    comeToStage: totalComeToStageCount,
    lostOrDisqualified: totalLostCount,
    movedToNext: totalMovedToNextCount,
    winRatePercent: totalComeToStageCount
      ? Math.round((wonCount / totalComeToStageCount) * 100)
      : ''
  });

  // Add total row for ACV table
  resultByACV.push({
    stage: 'Total',
    comeToStage: totalComeToStageACV,
    lostOrDisqualified: totalLostACV,
    movedToNext: totalMovedToNextACV,
    winRatePercent: totalComeToStageACV
      ? Math.round((wonACV / totalComeToStageACV) * 100)
      : ''
  });

  return {
    stageByCount: resultByCount,
    stageByACV: resultByACV
  };
}

module.exports = { processPipelineData };
