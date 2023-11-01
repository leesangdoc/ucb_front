import React, { useEffect } from 'react';
import * as d3 from 'd3';

const DonutPieChart = () => {
  useEffect(() => {
    const data = [10, 20, 30, 40, 50];
    const width = 500;
    const height = 500;
    const radius = Math.min(width, height) / 2;

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const svg = d3.select("#chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const arc: any = d3.arc().innerRadius(radius * 0.5).outerRadius(radius * 0.8);
    const pie = d3.pie().value((d: any) => d);

    const arcs = svg.selectAll("arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    arcs.append("path")
      .attr("d", arc)
      .attr("fill", (d: any, i: any) => color(i))
      //@ts-ignore
      .on('mouseover', function(this: any, d: any, i: any, nodes: any) {
        console.log('nodes;;;', nodes);
        console.log('nodes i;;;', i);
        // const [x, y] = d3.pointer(d, nodes[i]);
        const [x, y] = d3.pointer(d, 100); // i.endAngle
        const tooltip = svg.append('g')
          .attr('class', 'tooltip')
          .attr('transform', `translate(${100},${100})`); // x, y
        
        tooltip.append('rect')
          .attr('width', 50)
          .attr('height', 30)
          .attr('fill', 'white')
          .attr('stroke', 'black');

        tooltip.append('text')
          .text(d.data)
          .attr('x', 25)
          .attr('y', 20)
          .attr('text-anchor', 'middle')
          .attr('alignment-baseline', 'middle');
      })
      .on('mouseout', function() {
        svg.select('.tooltip').remove();
      });
  }, []);

  return <div id="chart" />;
};

export default DonutPieChart;
