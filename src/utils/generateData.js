/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const pets = [
  'dog',
  'cat',
  'bird',
  'lizard',
  'frog',
  'hamster',
  'fish',
  'rabbit',
  'snake'
]
const petNames = [
  'Bruno',
  'Willow',
  'Kona',
  'Heidi',
  'Rusty',
  'Bonnie',
  'Cash',
  'Gucci',
  'Brody',
  'Emma',
  'Loki',
  'Angel',
  'Astro',
  'Sherman',
  'Layla',
  'Peanut',
  'Grace',
  'Mickey',
  'Sasha',
  'Finn',
  'Tucker',
  'Bear',
  'Mocha',
  'Roscoe'
]
const lastNames = [
  'Caskcrest',
  'Windstalker',
  'Hammerglow',
  'Phoenixbreeze',
  'Mistthorn',
  'Crowroot',
  'Regalhammer',
  'Longglory',
  'Seaclaw',
  'Nosebleeder'
]

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const range = (len) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const newPet = (extraColumns) => {
  const extraDataProps = (Boolean(extraColumns)) && {
    ownerName: petNames[Math.floor(Math.random() * petNames.length)],
    weight: Math.floor(Math.random() * 40)
  }
  const defaultPet = {
    petType: pets[Math.floor(Math.random() * pets.length)],
    firstName: petNames[Math.floor(Math.random() * petNames.length)],
    lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 40),
    health: Math.floor(Math.random() * 100)
  }
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (extraColumns) {
    return {
      ...defaultPet,
      ...extraDataProps
    }
  }
  return defaultPet
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const generateData = ({ rows, extraColumns }) => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const makeDataLevel = (depth = 0) => {
    const lens = [rows]
    const len = lens[depth]
    return range(len).map(() => {
      return {
        ...newPet(extraColumns)
      }
    })
  }

  return makeDataLevel()
}
