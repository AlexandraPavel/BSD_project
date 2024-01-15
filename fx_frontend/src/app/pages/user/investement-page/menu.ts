import { PieItem } from './side-view/ui/model/pie-item';
import { backendUrl } from '../../../constants'


export let menu: PieItem[] = [
  {
    displayName: 'My Pie 1',
    currency: 'USD',
    value: 1000.10,
    route: 'home',
    coins: [
        {
          price: 100,
          name: 'Adobe',
          return: 10,
        },
        {
          price:2000,
          name: 'Google',
          return: 10,
        },
      ]
  },
  // {
  //   displayName: 'Profile',
  //   iconName: 'person',
  //   route: 'profile'
  // },
  {
    displayName: 'My Pie 2',
    currency: 'EUR',
    value: 1000.10,
    route: 'investement',
    coins: [
      {
        price: 100,
        name: 'Adobe',
        return: 10,
      },
      {
        price:2000,
        name: 'Google',
        return: 10,

      },
      {
        price:2000,
        name: 'Facebook',
        return: 10,

      },
    ]
  },
  // {
  //   displayName: 'My Pie 3',
  //   currency: 'RON',
  //   value: 1000.10,
  //   route: 'notification',
  //   coins: [
  //     {
  //       price: 100,
  //       name: 'Adobe',
  //       return: 10,
  //     },
  //     {
  //       price:2000,
  //       name: 'Google',
  //       return: 10,

  //     },
  //   ]
  // },
];
