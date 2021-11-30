import React, { Component } from 'react';
import { Stage, Layer, Rect, Text, Line } from 'react-konva';
import Konva from 'konva';
import { Play, Pause } from 'grommet-icons';
import { Box } from 'grommet';
export default class ComparisonArea extends Component{
  constructor(props) {
    super(props);
    this.state = {
      color:'green',
      horizontalLines: [50, 100, 150, 200, 250, 300, 350],
      verticalLines: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500],
      boxes: [],
    };

    this.handleClick = this.handleClick.bind(this);

  }


  componentDidMount(){
    var boxes_ = [];
    for (var i = 0; i < 16; i++) {
      var box = {index: i, x: i * 100 + 1, y: 201};
      boxes_.push(box);
    }
    this.setState({boxes: boxes_});
  }


  handleClick(){
    var that = this;
    this.setState({color: Konva.Util.getRandomColor()});
  };


  render() {
    return (
      <Box>
      <Stage width={1600} height={400}>
        <Layer >
          
           <Rect
        x={0}
        y={0}
        width={1600}
        height={400}
        fill={'white'}
        shadowBlur={0}
      />
       {this.state.boxes.map((box, i) => (
              <Rect
                key={i}
                x={box.x}
                y={box.y}
                width={98}
                height={48}
                
                fill={this.state.color}
                shadowBlur={1}
              draggable
              onDragStart={() => {
              this.setState({
                isDragging: true
              });
            }}
            onDragEnd={e => {
              var boxes_ = this.state.boxes;
              console.log("x: ",e.target.x(), ",y: ", e.target.y());
              boxes_[i].y =  Math.round(e.target.y() / 50) * 50 + 1;
              this.setState({
                isDragging: false,
                boxes: boxes_
              });
            }}

             dragBoundFunc={ pos => {
            return {
                x : box.x,
                y : Math.round(pos.y / 50)*50 + 1
            }
        }}
              />
      ))}

      <Text text="Try click on rect" />
      {this.state.horizontalLines.map((line, i) => (
              <Line
                key={i}
                points={[0, line, 1600, line]}
                stroke={'grey'}
                strokeWidth={1}
                lineCap="round"
              />
      ))}

      {this.state.verticalLines.map((line, i) => (
              <Line
                key={i}
                points={[line, 0, line, 400]}
                stroke={'grey'}
                strokeWidth={1}
                lineCap="round"
              />
      ))}
      
        </Layer>
      </Stage>
      <Play color='brand' />
      </Box>
    );
  }
}