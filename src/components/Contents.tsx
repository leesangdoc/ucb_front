import type { AppProps } from "next/app";
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";
import { useRouter } from "next/router";

export interface ContentsProps {
  // 추가적인 props를 정의하세요
  name: string
  , mark: string
}

const width = 200;
const height = 200;
// function Contents({ Component, pageProps }: AppProps) {
const Contents: React.FC<ContentsProps> = (props) => {
  // window.location.href = 'http://localhost:3000/TodoItem';
  const router = useRouter();
  console.log("router;;;", router);
  console.log('contents;;;;;ContentsProps;;;', props);
  useEffect(() => {
    
    const data = [
      {text: "apple", value: 12}
      , {text: "banana", value: 100}
      , {text: "kiwi", value: 50}
      , {text: "strawberry", value: 30}
      , {text: "blackberry", value: 30}
      , {text: "grape", value: 30}
      , {text: "melon", value: 30}
      , {text: "tamato", value: 30}
    ];
    cloud()
      .size([width, height])
      .words(
        data.map(function (d) {
          return { text: d.text, size: 10 + Math.random() * 90, test: "haha" };
        }),
      )
      .timeInterval(100)
      .padding(5)
      .font("Impact")
      .fontSize(function (d: any) {
        return d.size;
      })
      .on("end", end)
      .start();
    // 툴팁 표시 함수
function showTooltip(text:string, size: number, x:any, y:any) {
  const tooltip = d3.select("#tooltip");
  tooltip.transition().duration(200).style("opacity", 0.9);
  tooltip.html("<strong>" + text + "</strong><br/>Size: " + size)
    .style("left", (x + 10) + "px")
    .style("top", (y - 10) + "px");
}
 
// 툴팁 숨기는 함수
function hideTooltip() {
  d3.select("#tooltip").transition().duration(200).style("opacity", 0);
}
    function end(words: any) {
      d3.select("#word-cloud")
        .append("svg")
        .attr("width", 500)
        .attr("height", 500)
        .style("border", "1px solid black")
        .append("g")
        .attr("transform", "translate(" + 500 / 2 + "," + 500 / 2 + ")")
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", function (d: any) {
          return d.size + "px";
        })
        .style("font-family", "Impact")
        .attr("text-anchor", "middle")
        .attr("transform", function (d: any) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function (d: any) {
          return d.text;
        })
        .on("click", function(d: any) {
          // console.log('d;;;;;', d);
          alert(d.target.__data__.text);
        })
        .on("mouseover", function(d: any) {
          // console.log('d;;;', d);
          d3.select(this).style("fill", "red");
          showTooltip(d.target.__data__.text, d.target.__data__.size, d.pageX,d.pageY);
        })
        .on("mouseout", function(d) { // 마우스 아웃 이벤트 처리
          d3.select(this).style("fill", "steelblue");
          hideTooltip();
        });
  }

  });
  // useEffect end

  return (
    <>
      <div>
        {
          props.name === 'Green1' ?
          <div style={{'backgroundColor': 'gold', 'height': '100px', 'width': '50%'}}>
            이곳은 DIV영역이며, 바탕색을 금색(gold)으로 지정한 실제 모습이다. 
            <h1>Contents 리뷰 분석 결과</h1>
            <div id="word-cloud"></div>
            <div id="tooltip" style={{position: "absolute", opacity: 0}}></div>
          </div>
          :
          <div style={{'backgroundColor': 'purple', 'height': '100px', 'width': '50%'}}>
            {
            
            }
          </div>
        }
      </div>
    </>
  );
}

export default Contents;
