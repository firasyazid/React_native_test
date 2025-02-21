import { StackNavigationProp } from '@react-navigation/stack';

 export type RootStackParamList = {
  BottomTab: undefined;
  Detail: { pokemon: Pokemon };
};

export interface Pokemon {
  name: string;
  url: string;
  sprites: {
    front_default: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  stats: Array<{
    stat: {
      name: string;
    };
    base_stat: number;
  }>;
  
}

 export type DetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Detail'>;
