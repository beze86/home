type Color =
  | 'option-one'
  | 'option-two'
  | 'option-three'
  | 'option-four'
  | 'option-five'
  | 'option-six'
  | 'option-seven'
  | 'option-eight'
  | 'option-nine'
  | 'option-ten'
  | 'option-eleven';

type EventColorsMapType = Record<Color, string>;

const eventColorsMap: EventColorsMapType = {
  'option-one': 'red',
  'option-two': 'pink',
  'option-three': 'orange',
  'option-four': 'yellow',
  'option-five': 'green',
  'option-six': 'darkgreen',
  'option-seven': 'lightblue',
  'option-eight': 'darkblue',
  'option-nine': 'lavender',
  'option-ten': 'purple',
  'option-eleven': 'gray',
};

export type { EventColorsMapType, Color };

export { eventColorsMap };
