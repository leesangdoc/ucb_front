import React, { useEffect } from 'react';
import * as d3 from 'd3';

const StackedBarChart: React.FC = () => {
  useEffect(() => {
      const margin = { top: 20, right: 20, bottom: 40, left: 80 };
      const width = 500; // 300 - margin.left - margin.right
      const height = 200 - margin.top - margin.bottom;
      const svg = d3.select("#chart")
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
      // data
      const data = [
        { month: '유튜브', apples: 20 / 100, bananas: 40/ 100, cherries: 20/ 100, dates: 20/ 100, frequency: 222 },
        { month: '인스타', apples: 50/ 100, bananas: 10/ 100, cherries: 15/ 100, dates: 25/ 100, frequency: 1000 },
        { month: '커뮤니티', apples: 0 / 100, bananas: 50/ 100, cherries: 50/ 100, dates: 0/ 100, frequency: 20 },
        { month: '블로그', apples: 30 / 100, bananas: 60/ 100, cherries: 5/ 100, dates: 5/ 100, frequency: 50 },
        { month: '뉴스', apples: 20/ 100, bananas: 13/ 100, cherries: 17/ 100, dates: 50/ 100, frequency: 555 }
      ];
      const fruit = Object.keys(data[0]).filter(d => d !== 'month' && d !== 'frequency');
      const months = data.map(d => d.month);
      const stackedData = d3.stack<any, any>().keys(fruit)(data);
      const xMax = d3.max(stackedData[stackedData.length - 1], d => d[1]);
      // scales
      const x = d3.scaleLinear()
        .domain([0, xMax || 0]).nice()
        .range([0, width]);
      const y = d3.scaleBand()
        .domain(months)
        .range([0, height])
        .padding(0.25);
      const color = d3.scaleOrdinal<string>()
        .domain(fruit)
        .range(d3.schemeTableau10);
      // axes
      const xAxis = d3.axisBottom(x).ticks(5, '%');
      const yAxis = d3.axisLeft(y);
      svg.append('g')
        .attr('transform', `translate(0,${height + 20})`)
        .call(xAxis)
        .call(g => g.select('.domain').remove());
      svg.append('g')
        .attr('transform', `translate(0,20)`)
        .call(yAxis)
        .call(g => g.select('.domain').remove());
      // draw bars
      const layers = svg.append('g')
        .attr('transform', `translate(0,20)`)
        .selectAll('g')
        .data(stackedData)
        .join('g')
        .attr('fill', d => color(d.key));
      const duration = 1000;
      const t = d3.transition()
        .duration(duration)
        .ease(d3.easeLinear);

      layers.each(function (_, i) {
        d3.select(this)
          .selectAll('rect')
          .data((d:any) => d)
          .join('rect')
          .attr('x', (d:any) => x(d[0]))
          .attr('y', (d:any) => y(d.data.month) || 0)
          .attr('height', y.bandwidth())
          .transition(t)
          .delay(i * duration)
          .attr('width', (d:any) => x(d[1]) - x(d[0]));
      });

    layers
    .selectAll('rect')
    .on('mouseover', function(event, d:any) {
      const tooltip = svg.append('g')
        .attr('class', 'tooltip')
        .style('display', 'none');
      
      tooltip.style('display', 'block')
        .attr('transform', `translate(${x((d[0] + d[1]) / 2)}, ${y(d.data.month)})`);

      tooltip.append('text')
        .attr('x', 0)
        .attr('y', -10)
        .text(`${d[1] - d[0]}`); // 예시로 너비를 표시
    })
    .on('mouseout', function() {
      svg.select('.tooltip').remove();
    });

    const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(0, 0)`) // 위치 조정
      .selectAll('g')
      .data(fruit.slice().reverse())
      .join('g')
      .attr('transform', (d, i) => `translate(${i * 100}, 0)`); // 간격 조정 70

    legend.append('rect')
      .attr('width', 18)
      .attr('height', 18)
      .attr('fill', color);

    legend.append('text')
      .attr('x', (d) => {
        return String(d).length * 9;
      }) // 텍스트 위치 조정 24
      .attr('y', 9) 
      .attr('dy', '0.35em')
      .attr('dx', '1em')
      .style('text-anchor', 'end')
      .text((d) => d);
    
  }, []);

  return <div id="chart"></div>;
};

export default StackedBarChart;
