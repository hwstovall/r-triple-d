import * as React from "react";

import { storiesOf } from "@storybook/react";
import { Canvas } from "../src/components/canvas";
import {
  Rect,
  Arc,
  Circle,
  Ellipse,
  Line,
  Text
} from "../src/components/drawables";
import { number, text, withKnobs, color } from "@storybook/addon-knobs";

const stories = storiesOf("Drawables", module);
stories.addDecorator(withKnobs);

stories.add("Rect", () => {
  const x = number("X", 10, { min: 0, max: 200 });
  const y = number("Y", 10, { min: 0, max: 200 });
  const w = number("Width", 100, { min: 0, max: 200 });
  const h = number("Height", 100, { min: 0, max: 200 });
  const lineWidth = number("Line Width", 1, { min: 0, max: 10 });
  const strokeStyle = color("Stroke Style", "#000");
  const fillStyle = color("Fill Style", "transparent");

  return (
    <Canvas>
      <Rect
        x={x}
        y={y}
        w={w}
        h={h}
        lineWidth={lineWidth}
        strokeStyle={strokeStyle}
        fillStyle={fillStyle}
      />
    </Canvas>
  );
});

stories.add("Arc", () => {
  const radius = number("Radius", 50, { min: 0, max: 200 });
  const startAngle = number("Start Angle", 0, { min: 0, max: 2 * Math.PI });
  const endAngle = number("End Angle", 360, { min: 0, max: 2 * Math.PI });
  const lineWidth = number("Line Width", 1, { min: 0, max: 10 });
  const strokeStyle = color("Stroke Style", "#000");
  const fillStyle = color("Fill Style", "transparent");

  return (
    <Canvas>
      <Arc
        x={radius + lineWidth}
        y={radius + lineWidth}
        radius={radius}
        startAngle={startAngle * (Math.PI / 180)}
        endAngle={endAngle * (Math.PI / 180)}
        lineCap="round"
        lineJoin="round"
        lineWidth={lineWidth}
        fillStyle={fillStyle}
        strokeStyle={strokeStyle}
      />
    </Canvas>
  );
});

stories.add("Circle", () => {
  const radius = number("Radius", 50, { min: 0, max: 200 });
  const lineWidth = number("Line Width", 1, { min: 0, max: 10 });
  const strokeStyle = color("Stroke Style", "#000");
  const fillStyle = color("Fill Style", "transparent");

  return (
    <Canvas>
      <Circle
        x={radius + lineWidth}
        y={radius + lineWidth}
        radius={radius}
        lineWidth={lineWidth}
        fillStyle={fillStyle}
        strokeStyle={strokeStyle}
      />
    </Canvas>
  );
});

stories.add("Line", () => {
  const x1 = number("X1", 10, { min: 0, max: 200 });
  const y1 = number("Y1", 10, { min: 0, max: 200 });
  const x2 = number("X2", 20, { min: 0, max: 200 });
  const y2 = number("Y2", 20, { min: 0, max: 200 });
  const lineWidth = number("Line Width", 1, { min: 0, max: 10 });
  const strokeStyle = color("Stroke Style", "#000");

  return (
    <Canvas>
      <Line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        lineWidth={lineWidth}
        strokeStyle={strokeStyle}
      />
    </Canvas>
  );
});

stories.add("Ellipse", () => {
  const x = number("X", 100, { min: 0, max: 200 });
  const y = number("Y", 100, { min: 0, max: 200 });
  const radiusX = number("Radius X", 50, { min: 0, max: 200 });
  const radiusY = number("Radius Y", 100, { min: 0, max: 200 });
  const rotation = number("Rotation", 0, {
    min: 0,
    max: 360 * (Math.PI / 180)
  });
  const startAngle = number("Start Angle", 0, {
    min: 0,
    max: 360 * (Math.PI / 180)
  });
  const endAngle = number("End Angle", 2 * Math.PI, {
    min: 0,
    max: 360 * (Math.PI / 180)
  });
  const lineWidth = number("Line Width", 1, { min: 0, max: 10 });
  const strokeStyle = color("Stroke Style", "#000");
  const fillStyle = color("Fill Style", "transparent");

  return (
    <Canvas>
      <Ellipse
        x={x}
        y={y}
        radiusX={radiusX}
        radiusY={radiusY}
        rotation={rotation}
        startAngle={startAngle}
        endAngle={endAngle}
        lineWidth={lineWidth}
        strokeStyle={strokeStyle}
        fillStyle={fillStyle}
      />
    </Canvas>
  );
});

stories.add("Text", () => {
  const textValue = text("Text", "Testing 123");
  const font = text("Font", "60px Arial");
  const x = number("X", 100, { min: 0, max: 200 });
  const y = number("Y", 100, { min: 0, max: 200 });
  const lineWidth = number("Line Width", 1, { min: 0, max: 10 });
  const strokeStyle = color("Stroke Style", "#000");
  const fillStyle = color("Fill Style", "#000");

  return (
    <Canvas>
      <Text
        text={textValue}
        x={x}
        y={y}
        font={font}
        lineWidth={lineWidth}
        strokeStyle={strokeStyle}
        fillStyle={fillStyle}
      />
    </Canvas>
  );
});
