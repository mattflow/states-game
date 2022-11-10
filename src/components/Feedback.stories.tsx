import { ComponentMeta, ComponentStory } from "@storybook/react";
import Feedback from "./Feedback";

export default {
  title: "Feedback",
  component: Feedback,
} as ComponentMeta<typeof Feedback>;

const Template: ComponentStory<typeof Feedback> = (args) => (
  <Feedback {...args} />
);

export const Default = Template.bind({});
