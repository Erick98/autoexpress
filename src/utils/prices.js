import _ from "lodash";

export const prices = [
  {
    m3: 0.08,
    kg: 20,
    list: [
      { cities: ["cdmx", "gda"], amount: 120 },
      { cities: ["cdmx", "mty"], amount: 120 },
      { cities: ["cdmx", "quer"], amount: 120 },
      { cities: ["cdmx", "leon"], amount: 120 },
      { cities: ["gda", "mty"], amount: 120 },
      { cities: ["gda", "quer"], amount: 120 },
      { cities: ["gda", "leon"], amount: 120 },
      { cities: ["mty", "quer"], amount: 120 },
      { cities: ["mty", "leon"], amount: 120 },
      { cities: ["quer", "leon"], amount: 120 },
    ],
  },
  {
    m3: 0.25,
    kg: 50,
    list: [
      { cities: ["cdmx", "gda"], amount: 180 },
      { cities: ["cdmx", "mty"], amount: 180 },
      { cities: ["cdmx", "quer"], amount: 180 },
      { cities: ["cdmx", "leon"], amount: 180 },
      { cities: ["gda", "mty"], amount: 180 },
      { cities: ["gda", "quer"], amount: 180 },
      { cities: ["gda", "leon"], amount: 180 },
      { cities: ["mty", "quer"], amount: 180 },
      { cities: ["mty", "leon"], amount: 180 },
      { cities: ["quer", "leon"], amount: 180 },
    ],
  },
  {
    m3: 0.43,
    kg: 100,
    list: [
      { cities: ["cdmx", "gda"], amount: 215 },
      { cities: ["cdmx", "mty"], amount: 236.5 },
      { cities: ["cdmx", "quer"], amount: 193.5 },
      { cities: ["cdmx", "leon"], amount: 215 },
      { cities: ["gda", "mty"], amount: 215 },
      { cities: ["gda", "quer"], amount: 215 },
      { cities: ["gda", "leon"], amount: 215 },
      { cities: ["mty", "quer"], amount: 215 },
      { cities: ["mty", "leon"], amount: 215 },
      { cities: ["quer", "leon"], amount: 215 },
    ],
  },
  {
    m3: 0.45,
    kg: 200,
    list: [
      { cities: ["cdmx", "gda"], amount: 225 },
      { cities: ["cdmx", "mty"], amount: 247.5 },
      { cities: ["cdmx", "quer"], amount: 202.5 },
      { cities: ["cdmx", "leon"], amount: 225 },
      { cities: ["gda", "mty"], amount: 225 },
      { cities: ["gda", "quer"], amount: 225 },
      { cities: ["gda", "leon"], amount: 225 },
      { cities: ["mty", "quer"], amount: 225 },
      { cities: ["mty", "leon"], amount: 225 },
      { cities: ["quer", "leon"], amount: 225 },
    ],
  },
  {
    m3: 0.75,
    kg: 300,
    list: [
      { cities: ["cdmx", "gda"], amount: 375 },
      { cities: ["cdmx", "mty"], amount: 412.5 },
      { cities: ["cdmx", "quer"], amount: 337.5 },
      { cities: ["cdmx", "leon"], amount: 375 },
      { cities: ["gda", "mty"], amount: 375 },
      { cities: ["gda", "quer"], amount: 375 },
      { cities: ["gda", "leon"], amount: 375 },
      { cities: ["mty", "quer"], amount: 375 },
      { cities: ["mty", "leon"], amount: 375 },
      { cities: ["quer", "leon"], amount: 375 },
    ],
  },
  {
    m3: 0.9,
    kg: 400,
    list: [
      { cities: ["cdmx", "gda"], amount: 450 },
      { cities: ["cdmx", "mty"], amount: 495 },
      { cities: ["cdmx", "quer"], amount: 405 },
      { cities: ["cdmx", "leon"], amount: 450 },
      { cities: ["gda", "mty"], amount: 450 },
      { cities: ["gda", "quer"], amount: 450 },
      { cities: ["gda", "leon"], amount: 450 },
      { cities: ["mty", "quer"], amount: 450 },
      { cities: ["mty", "leon"], amount: 450 },
      { cities: ["quer", "leon"], amount: 450 },
    ],
  },
  {
    m3: 1,
    kg: 500,
    list: [
      { cities: ["cdmx", "gda"], amount: 500 },
      { cities: ["cdmx", "mty"], amount: 550 },
      { cities: ["cdmx", "quer"], amount: 450 },
      { cities: ["cdmx", "leon"], amount: 500 },
      { cities: ["gda", "mty"], amount: 500 },
      { cities: ["gda", "quer"], amount: 500 },
      { cities: ["gda", "leon"], amount: 500 },
      { cities: ["mty", "quer"], amount: 500 },
      { cities: ["mty", "leon"], amount: 500 },
      { cities: ["quer", "leon"], amount: 500 },
    ],
  },
  {
    m3: 1.2,
    kg: 600,
    list: [
      { cities: ["cdmx", "gda"], amount: 600 },
      { cities: ["cdmx", "mty"], amount: 660 },
      { cities: ["cdmx", "quer"], amount: 540 },
      { cities: ["cdmx", "leon"], amount: 600 },
      { cities: ["gda", "mty"], amount: 600 },
      { cities: ["gda", "quer"], amount: 600 },
      { cities: ["gda", "leon"], amount: 600 },
      { cities: ["mty", "quer"], amount: 600 },
      { cities: ["mty", "leon"], amount: 600 },
      { cities: ["quer", "leon"], amount: 600 },
    ],
  },
  {
    m3: 1.5,
    kg: 700,
    list: [
      { cities: ["cdmx", "gda"], amount: 750 },
      { cities: ["cdmx", "mty"], amount: 825 },
      { cities: ["cdmx", "quer"], amount: 675 },
      { cities: ["cdmx", "leon"], amount: 750 },
      { cities: ["gda", "mty"], amount: 750 },
      { cities: ["gda", "quer"], amount: 750 },
      { cities: ["gda", "leon"], amount: 750 },
      { cities: ["mty", "quer"], amount: 750 },
      { cities: ["mty", "leon"], amount: 750 },
      { cities: ["quer", "leon"], amount: 750 },
    ],
  },
  {
    m3: 1.7,
    kg: 800,
    list: [
      { cities: ["cdmx", "gda"], amount: 850 },
      { cities: ["cdmx", "mty"], amount: 935 },
      { cities: ["cdmx", "quer"], amount: 765 },
      { cities: ["cdmx", "leon"], amount: 850 },
      { cities: ["gda", "mty"], amount: 850 },
      { cities: ["gda", "quer"], amount: 850 },
      { cities: ["gda", "leon"], amount: 850 },
      { cities: ["mty", "quer"], amount: 850 },
      { cities: ["mty", "leon"], amount: 850 },
      { cities: ["quer", "leon"], amount: 850 },
    ],
  },
  {
    m3: 1.9,
    kg: 900,
    list: [
      { cities: ["cdmx", "gda"], amount: 950 },
      { cities: ["cdmx", "mty"], amount: 1045 },
      { cities: ["cdmx", "quer"], amount: 855 },
      { cities: ["cdmx", "leon"], amount: 950 },
      { cities: ["gda", "mty"], amount: 950 },
      { cities: ["gda", "quer"], amount: 950 },
      { cities: ["gda", "leon"], amount: 950 },
      { cities: ["mty", "quer"], amount: 950 },
      { cities: ["mty", "leon"], amount: 950 },
      { cities: ["quer", "leon"], amount: 950 },
    ],
  },
  {
    m3: 2,
    kg: 1000,
    list: [
      { cities: ["cdmx", "gda"], amount: 1000 },
      { cities: ["cdmx", "mty"], amount: 1100 },
      { cities: ["cdmx", "quer"], amount: 900 },
      { cities: ["cdmx", "leon"], amount: 1000 },
      { cities: ["gda", "mty"], amount: 1000 },
      { cities: ["gda", "quer"], amount: 1000 },
      { cities: ["gda", "leon"], amount: 1000 },
      { cities: ["mty", "quer"], amount: 1000 },
      { cities: ["mty", "leon"], amount: 1000 },
      { cities: ["quer", "leon"], amount: 1000 },
    ],
  },
  {
    m3: 2.5,
    kg: 1250,
    list: [
      { cities: ["cdmx", "gda"], amount: 1250 },
      { cities: ["cdmx", "mty"], amount: 1375 },
      { cities: ["cdmx", "quer"], amount: 1125 },
      { cities: ["cdmx", "leon"], amount: 1250 },
      { cities: ["gda", "mty"], amount: 1250 },
      { cities: ["gda", "quer"], amount: 1250 },
      { cities: ["gda", "leon"], amount: 1250 },
      { cities: ["mty", "quer"], amount: 1250 },
      { cities: ["mty", "leon"], amount: 1250 },
      { cities: ["quer", "leon"], amount: 1250 },
    ],
  },
  {
    m3: 3,
    kg: 1500,
    list: [
      { cities: ["cdmx", "gda"], amount: 1500 },
      { cities: ["cdmx", "mty"], amount: 1650 },
      { cities: ["cdmx", "quer"], amount: 1350 },
      { cities: ["cdmx", "leon"], amount: 1500 },
      { cities: ["gda", "mty"], amount: 1500 },
      { cities: ["gda", "quer"], amount: 1500 },
      { cities: ["gda", "leon"], amount: 1500 },
      { cities: ["mty", "quer"], amount: 1500 },
      { cities: ["mty", "leon"], amount: 1500 },
      { cities: ["quer", "leon"], amount: 1500 },
    ],
  },
  {
    m3: 3.5,
    kg: 1750,
    list: [
      { cities: ["cdmx", "gda"], amount: 1750 },
      { cities: ["cdmx", "mty"], amount: 1925 },
      { cities: ["cdmx", "quer"], amount: 1575 },
      { cities: ["cdmx", "leon"], amount: 1750 },
      { cities: ["gda", "mty"], amount: 1750 },
      { cities: ["gda", "quer"], amount: 1750 },
      { cities: ["gda", "leon"], amount: 1750 },
      { cities: ["mty", "quer"], amount: 1750 },
      { cities: ["mty", "leon"], amount: 1750 },
      { cities: ["quer", "leon"], amount: 1750 },
    ],
  },
  {
    m3: 4,
    kg: 2000,
    list: [
      { cities: ["cdmx", "gda"], amount: 2000 },
      { cities: ["cdmx", "mty"], amount: 2200 },
      { cities: ["cdmx", "quer"], amount: 1800 },
      { cities: ["cdmx", "leon"], amount: 2000 },
      { cities: ["gda", "mty"], amount: 2000 },
      { cities: ["gda", "quer"], amount: 2000 },
      { cities: ["gda", "leon"], amount: 2000 },
      { cities: ["mty", "quer"], amount: 2000 },
      { cities: ["mty", "leon"], amount: 2000 },
      { cities: ["quer", "leon"], amount: 2000 },
    ],
  },
  {
    m3: 4.5,
    kg: 2250,
    list: [
      { cities: ["cdmx", "gda"], amount: 2250 },
      { cities: ["cdmx", "mty"], amount: 2475 },
      { cities: ["cdmx", "quer"], amount: 2025 },
      { cities: ["cdmx", "leon"], amount: 2250 },
      { cities: ["gda", "mty"], amount: 2250 },
      { cities: ["gda", "quer"], amount: 2250 },
      { cities: ["gda", "leon"], amount: 2250 },
      { cities: ["mty", "quer"], amount: 2250 },
      { cities: ["mty", "leon"], amount: 2250 },
      { cities: ["quer", "leon"], amount: 2250 },
    ],
  },
  {
    m3: 5,
    kg: 2500,
    list: [
      { cities: ["cdmx", "gda"], amount: 2500 },
      { cities: ["cdmx", "mty"], amount: 2750 },
      { cities: ["cdmx", "quer"], amount: 2250 },
      { cities: ["cdmx", "leon"], amount: 2500 },
      { cities: ["gda", "mty"], amount: 2500 },
      { cities: ["gda", "quer"], amount: 2500 },
      { cities: ["gda", "leon"], amount: 2500 },
      { cities: ["mty", "quer"], amount: 2500 },
      { cities: ["mty", "leon"], amount: 2500 },
      { cities: ["quer", "leon"], amount: 2500 },
    ],
  },
  {
    m3: 5.5,
    kg: 2750,
    list: [
      { cities: ["cdmx", "gda"], amount: 2750 },
      { cities: ["cdmx", "mty"], amount: 3025 },
      { cities: ["cdmx", "quer"], amount: 2475 },
      { cities: ["cdmx", "leon"], amount: 2750 },
      { cities: ["gda", "mty"], amount: 2750 },
      { cities: ["gda", "quer"], amount: 2750 },
      { cities: ["gda", "leon"], amount: 2750 },
      { cities: ["mty", "quer"], amount: 2750 },
      { cities: ["mty", "leon"], amount: 2750 },
      { cities: ["quer", "leon"], amount: 2750 },
    ],
  },
  {
    m3: 6,
    kg: 3000,
    list: [
      { cities: ["cdmx", "gda"], amount: 3000 },
      { cities: ["cdmx", "mty"], amount: 3300 },
      { cities: ["cdmx", "quer"], amount: 2700 },
      { cities: ["cdmx", "leon"], amount: 3000 },
      { cities: ["gda", "mty"], amount: 3000 },
      { cities: ["gda", "quer"], amount: 3000 },
      { cities: ["gda", "leon"], amount: 3000 },
      { cities: ["mty", "quer"], amount: 3000 },
      { cities: ["mty", "leon"], amount: 3000 },
      { cities: ["quer", "leon"], amount: 3000 },
    ],
  },
  {
    m3: 7,
    kg: 3500,
    list: [
      { cities: ["cdmx", "gda"], amount: 3325 },
      { cities: ["cdmx", "mty"], amount: 3850 },
      { cities: ["cdmx", "quer"], amount: 3150 },
      { cities: ["cdmx", "leon"], amount: 3325 },
      { cities: ["gda", "mty"], amount: 3325 },
      { cities: ["gda", "quer"], amount: 3325 },
      { cities: ["gda", "leon"], amount: 3325 },
      { cities: ["mty", "quer"], amount: 3325 },
      { cities: ["mty", "leon"], amount: 3325 },
      { cities: ["quer", "leon"], amount: 3325 },
    ],
  },
  {
    m3: 8,
    kg: 4000,
    list: [
      { cities: ["cdmx", "gda"], amount: 3800 },
      { cities: ["cdmx", "mty"], amount: 4400 },
      { cities: ["cdmx", "quer"], amount: 3600 },
      { cities: ["cdmx", "leon"], amount: 3800 },
      { cities: ["gda", "mty"], amount: 3800 },
      { cities: ["gda", "quer"], amount: 3800 },
      { cities: ["gda", "leon"], amount: 3800 },
      { cities: ["mty", "quer"], amount: 3800 },
      { cities: ["mty", "leon"], amount: 3800 },
      { cities: ["quer", "leon"], amount: 3800 },
    ],
  },
  {
    m3: 9,
    kg: 4500,
    list: [
      { cities: ["cdmx", "gda"], amount: 4275 },
      { cities: ["cdmx", "mty"], amount: 4950 },
      { cities: ["cdmx", "quer"], amount: 4050 },
      { cities: ["cdmx", "leon"], amount: 4275 },
      { cities: ["gda", "mty"], amount: 4275 },
      { cities: ["gda", "quer"], amount: 4275 },
      { cities: ["gda", "leon"], amount: 4275 },
      { cities: ["mty", "quer"], amount: 4275 },
      { cities: ["mty", "leon"], amount: 4275 },
      { cities: ["quer", "leon"], amount: 4275 },
    ],
  },
  {
    m3: 10,
    kg: 5000,
    list: [
      { cities: ["cdmx", "gda"], amount: 4500 },
      { cities: ["cdmx", "mty"], amount: 5500 },
      { cities: ["cdmx", "quer"], amount: 4500 },
      { cities: ["cdmx", "leon"], amount: 4500 },
      { cities: ["gda", "mty"], amount: 4500 },
      { cities: ["gda", "quer"], amount: 4500 },
      { cities: ["gda", "leon"], amount: 4500 },
      { cities: ["mty", "quer"], amount: 4500 },
      { cities: ["mty", "leon"], amount: 4500 },
      { cities: ["quer", "leon"], amount: 4500 },
    ],
  },
  {
    m3: 14,
    kg: 7000,
    list: [
      { cities: ["cdmx", "gda"], amount: 6300 },
      { cities: ["cdmx", "mty"], amount: 7700 },
      { cities: ["cdmx", "quer"], amount: 6300 },
      { cities: ["cdmx", "leon"], amount: 6300 },
      { cities: ["gda", "mty"], amount: 6300 },
      { cities: ["gda", "quer"], amount: 6300 },
      { cities: ["gda", "leon"], amount: 6300 },
      { cities: ["mty", "quer"], amount: 6300 },
      { cities: ["mty", "leon"], amount: 6300 },
      { cities: ["quer", "leon"], amount: 6300 },
    ],
  },
  {
    m3: 18,
    kg: 9000,
    list: [
      { cities: ["cdmx", "gda"], amount: 8100 },
      { cities: ["cdmx", "mty"], amount: 9900 },
      { cities: ["cdmx", "quer"], amount: 8100 },
      { cities: ["cdmx", "leon"], amount: 8100 },
      { cities: ["gda", "mty"], amount: 8100 },
      { cities: ["gda", "quer"], amount: 8100 },
      { cities: ["gda", "leon"], amount: 8100 },
      { cities: ["mty", "quer"], amount: 8100 },
      { cities: ["mty", "leon"], amount: 8100 },
      { cities: ["quer", "leon"], amount: 8100 },
    ],
  },
  {
    m3: 20,
    kg: 10000,
    list: [
      { cities: ["cdmx", "gda"], amount: 9000 },
      { cities: ["cdmx", "mty"], amount: 11000 },
      { cities: ["cdmx", "quer"], amount: 9000 },
      { cities: ["cdmx", "leon"], amount: 9000 },
      { cities: ["gda", "mty"], amount: 9000 },
      { cities: ["gda", "quer"], amount: 9000 },
      { cities: ["gda", "leon"], amount: 9000 },
      { cities: ["mty", "quer"], amount: 9000 },
      { cities: ["mty", "leon"], amount: 9000 },
      { cities: ["quer", "leon"], amount: 9000 },
    ],
  },
];

export const calculator = (item) => {
  if (item.weight) {
    const filter = _.filter(prices, (o) => {
      return o.kg >= item.weight;
    });
    const resp = _.head(filter);
    return resp;
  }
  if (item.m3) {
    const filter = _.filter(prices, (o) => {
      return o.m3 >= item.m3;
    });
    const resp = _.head(filter);
    return resp;
  }
};
