const initialState = {
  login: {
    isLoggedIn: false //FIXME
  },
  progress: {
    showProgress: true
  },
  user: {
    firstName: '',
    lastName: '',
    email: '',
    userId: null,
    propertyIds: [],
    selectedPropertyId: null, //FIXME change this back to null after testing
    planType: 'Basic',
    phone: '',
    address: {
      mailingAddress: '',
      mailingCity: '',
      mailingState: '',
      mailingZipcode: ''
    }
  },
  property: {
    cost: null,
    appealType: '',
    street: '',
    city: '',
    township: '',
    use: '',
    yearPurchased: '',
    pricePurchased: 0,
    typeOfResidence: '',
    numFullBaths: 0,
    landSqFeet: 0,
    numCommercialUnits: 0,
    centralAC: '',
    reason: null,
    id: 0,
    ownershipStatus: null,
    userId: 0,
    buildingSqFeet: 0,
    numFireplaces: 0,
    numHalfBaths: 0,
    exterior: '',
    pin: 0,
    yearBuilt: 0,
    foundationType: '',
    basementFinish: '',
    atticSize: '',
    atticFinish: '',
    garageType: '',
    garageSize: '',
    numBeds: 0,
    numUnits: 0,
    value: 0,
    compPins: [],
    progress: 0,
    paid: null,
    appealStatus: [],
    address: {
      streetAddress: '',
      city: '',
      state: 'IL',
      zipcode: ''
    }
  },
  //FIXME se this to empty array
  comps: {
    comps: [
      // {
      //   age: 143,
      //   basementFinish: 'Unfinished',
      //   buildingSqFeet: 5350,
      //   centralAC: 'Central',
      //   exterior: 'Frame',
      //   foundationType: 'Slab',
      //   garageSize: null,
      //   garageType: 'Detached',
      //   landSqFeet: 2675,
      //   numBeds: 3,
      //   numFireplaces: 0,
      //   numFullBaths: 2,
      //   numHalfBaths: 1,
      //   numUnits: null,
      //   pin: 34122074,
      //   pricePurchased: 395000,
      //   township: '39N',
      //   typeOfResidence: 2,
      //   use: 'Single family',
      //   marketValue: 494255,
      //   yearBuilt: 1875,
      //   yearPurchased: '2002',
      //   streetAddress: '510 Devon Dr',
      //   city: 'Burr Ridge',
      //   zipcode: 60527,
      //   state: 'IL'
      // }
      // {
      //   comp_pin: 18086626,
      //   address: '510 Devon Dr',
      //   buildingSqFeet: 20017,
      //   landSqFeet: 20630,
      //   use: 'Single Family',
      //   yearBuilt: 1990,
      //   numFullBaths: 2,
      //   numHalfBaths: 1,
      //   garageSize: 'Two Car',
      //   typeOfResidence: 'Two Story',
      //   basementFinish: 'Finished',
      //   marketValue: 160342
      // },
      // {
      //   comp_pin: 63553322,
      //   address: '511 Devon Dr',
      //   buildingSqFeet: 40698,
      //   landSqFeet: 20349,
      //   use: 'Single Family',
      //   yearBuilt: 1999,
      //   numFullBaths: 3,
      //   numHalfBaths: null,
      //   garageSize: 'Two Car',
      //   typeOfResidence: 'Two Story',
      //   basementFinish: null,
      //   marketValue: 138100
      // }
    ],
    likelihood: 'HIGHLY LIKELY'
  },
  admin: {
    adminAuthorized: false,
    token: null,
    appealStatus: [],
    property: {
      // pin: 17396039,
      // address: '511 Devon Dr',
      // lastName: 'Wang',
      // appealStatus: 'Submitted',
      // id: 34
    }
  }
}

/*
{
                "age": -1,
                "basement_finish": -1,
                "building_sqfeet": -20630,
                "central_ac": -1,
                "exterior": -1,
                "foundation_type": -1,
                "garage_size": -1,
                "garage_type": -1,
                "land_sqfeet": 20630,
                "num_beds": -1,
                "num_fireplaces": -1,
                "num_full_baths": -1,
                "num_half_baths": -1,
                "num_units": -1,
                "pin": 980744,
                "price_purchased": 950000,
                "township": "37",
                "type_of_residence": -1,
                "use": "Single family",
                "value": 849165,
                "year_purchased": "2007"
            },
            {
                "age": 28,
                "basement_finish": -1,
                "building_sqfeet": 28000,
                "central_ac": -1,
                "exterior": "Frame Brick",
                "foundation_type": -1,
                "garage_size": 506,
                "garage_type": "Undefined Type",
                "land_sqfeet": 14000,
                "num_beds": -1,
                "num_fireplaces": -1,
                "num_full_baths": 2,
                "num_half_baths": 1,
                "num_units": -1,
                "pin": 17396039,
                "price_purchased": 650000,
                "township": "38",
                "type_of_residence": 2,
                "use": "Single family",
                "value": 660580,
                "year_purchased": "2017"
            }
*/

export default initialState
