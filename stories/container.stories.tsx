import * as React from "react";

import { storiesOf } from "@storybook/react";
import { Container } from "../src/components/container";

const stories = storiesOf("Container", module);

stories.add("Default", () => {
  return <Container />;
});
