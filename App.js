import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/navigations/';

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
