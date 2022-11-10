import { ComponentMeta, ComponentStory } from "@storybook/react";
import GuessInput from "./GuessInput";

export default {
  title: "GuessInput",
  component: GuessInput,
} as ComponentMeta<typeof GuessInput>;

const Template: ComponentStory<typeof GuessInput> = (args) => (
  <GuessInput {...args} />
);

export const Default = Template.bind({});
