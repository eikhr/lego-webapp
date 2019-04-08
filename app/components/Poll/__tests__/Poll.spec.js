import Poll from '../.';

const props = {
  poll: {
    option: undefined
  }
};

const poll = new Poll(props);
const perfectRatiosTests = [
  {
    input: [{ ratio: 33.33 }, { ratio: 33.33 }, { ratio: 33.33 }],
    output: [{ ratio: 34 }, { ratio: 33 }, { ratio: 33 }]
  },
  {
    input: [
      { ratio: 13.626332 },
      { ratio: 47.989636 },
      { ratio: 9.596008 },
      { ratio: 28.788024 }
    ],
    output: [{ ratio: 48 }, { ratio: 29 }, { ratio: 14 }, { ratio: 9 }]
  },
  {
    input: [
      { ratio: 16.667 },
      { ratio: 16.666 },
      { ratio: 16.666 },
      { ratio: 16.666 },
      { ratio: 16.666 },
      { ratio: 16.666 }
    ],
    output: [
      { ratio: 17 },
      { ratio: 17 },
      { ratio: 17 },
      { ratio: 17 },
      { ratio: 16 },
      { ratio: 16 }
    ]
  },
  {
    input: [{ ratio: 33.333 }, { ratio: 33.333 }, { ratio: 33.333 }],
    output: [{ ratio: 34 }, { ratio: 33 }, { ratio: 33 }]
  },
  {
    input: [{ ratio: 33.3 }, { ratio: 33.3 }, { ratio: 33.3 }, { ratio: 0.1 }],
    output: [{ ratio: 34 }, { ratio: 33 }, { ratio: 33 }, { ratio: 0 }]
  }
];

describe('poll options', () => {
  it('should add up to 100%', () => {
    perfectRatiosTests.forEach(({ input, output }) => {
      expect(poll.perfectRatios(input, input)).toEqual(output);
    });
  });
});
