import React, { useEffect } from 'react';
import * as d3 from 'd3';

// Updated renderStageChart with compact layout and % between bars
export const renderStageChart = (data, containerId, isACV = false) => {
  if (!data || !data.length) {
    console.warn('No data available to render for container:', containerId);
    return;
  }

  // Remove 'Total' row if present
  const filteredData = data.filter(d => d.stage.toLowerCase() !== 'total');

  // Set up compact margins and dimensions
  const margin = { top: 20, right: 50, bottom: 30, left: 110 };
  const width = 600 - margin.left - margin.right;
  const barHeight = 30;
  const gap = 10;
  const height = filteredData.length * (barHeight + gap);

  // Remove any existing SVG
  d3.select(`#${containerId}`).select('svg').remove();

  // Create SVG canvas
  const svg = d3
    .select(`#${containerId}`)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const xScale = d3.scaleLinear().domain([0, 100]).range([0, width]);

  filteredData.forEach((stage, i) => {
    const y = i * (barHeight + gap);
    const greenPercent = stage.comeToStage > 0
      ? (stage.movedToNext / stage.comeToStage) * 100
      : 0;

    // Gray background bar
    svg.append('rect')
      .attr('x', 0)
      .attr('y', y)
      .attr('width', xScale(100))
      .attr('height', barHeight)
      .attr('fill', '#e0e0e0');

    // Green foreground bar
    svg.append('rect')
      .attr('x', 0)
      .attr('y', y)
      .attr('width', xScale(greenPercent))
      .attr('height', barHeight)
      .attr('fill', '#6FCF97');

    // Stage label (left side)
    svg.append('text')
      .attr('x', -10)
      .attr('y', y + barHeight / 2 + 5)
      .attr('text-anchor', 'end')
      .style('font-size', '12px')
      .text(stage.stage);

    // Inside green bar: comeToStage count
    svg.append('text')
      .attr('x', xScale(greenPercent) / 2)
      .attr('y', y + barHeight / 2 + 5)
      .attr('text-anchor', 'middle')
      .attr('fill', '#fff')
      .style('font-weight', 'bold')
      .style('font-size', '12px')
      .text(isACV ? `$${stage.comeToStage.toLocaleString()}` : stage.comeToStage);

    // Win rate % (right side)
    svg.append('text')
      .attr('x', xScale(100) + 8)
      .attr('y', y + barHeight / 2 + 5)
      .attr('text-anchor', 'start')
      .style('font-weight', 'bold')
      .style('font-size', '12px')
      .text(`${stage.winRatePercent}%`);

    // Between bars: % moved to next stage
    if (i < filteredData.length - 1) {
      const nextY = y + barHeight + gap / 2;
      svg.append('text')
        .attr('x', xScale(100) / 2)
        .attr('y', nextY + 5)
        .attr('text-anchor', 'middle')
        .attr('fill', '#000')
        .style('font-weight', 'bold')
        .style('font-size', '12px')
        .text(`${Math.round(greenPercent)}%`);
    }
  });
};

// Chart component
const Chart = ({ data, title }) => {
  const containerId = title.toLowerCase().replace(/\s+/g, '-');

  useEffect(() => {
    if (data && data.length > 0) {
      const isACV = title.toLowerCase().includes('acv');
      renderStageChart(data, containerId, isACV);
    }
  }, [data, containerId, title]);

  return (
    <div>
      <h4>{title}</h4>
      <div id={containerId} />
    </div>
  );
};

export default Chart;
