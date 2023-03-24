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
  'option-one': '#ff1744',
  'option-two': '#d32f2f',
  'option-three': '#ff9800',
  'option-four': '#ed6c02',
  'option-five': '#4caf50',
  'option-six': '#2e7d32',
  'option-seven': '#4dabf5',
  'option-eight': '#2196f3',
  'option-nine': '#dd33fa',
  'option-ten': '#d500f9',
  'option-eleven': '#6B7280',
};

export type { EventColorsMapType, Color };

export { eventColorsMap };
