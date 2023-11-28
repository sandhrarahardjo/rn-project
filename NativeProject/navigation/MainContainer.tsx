import React from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegistrationScreen from './screens/RegistrationScreen';

type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Registration: undefined;
};

type MainContainerProps = {
  route: RouteProp<RootStackParamList, keyof RootStackParamList>;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

const MainContainer: React.FC<MainContainerProps> = () => {
	return (
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName='Home'
				screenOptions={{
					tabBarActiveTintColor: '#e91e63' ,
				}} > 
				<Tab.Screen
					name='Home'
					component={HomeScreen}
					options={{
						tabBarLabel: 'Home',
						tabBarIcon: ({ color, size}) => (
							<Ionicons name='home' color={color} size={size} />
						),
					}}/>
				<Tab.Screen
					name='Profile'
					component={ProfileScreen}
					options={{
						tabBarLabel: 'Profile',
						tabBarIcon: ({ color, size }) => (
							<Ionicons name='person' color={color} size={size}/>
						),
					}}/>
				<Tab.Screen
					name='Registration'
					component={RegistrationScreen}
					options={{
						tabBarLabel: 'Register',
						tabBarIcon: ({ color, size }) => (
							<Ionicons name='add-circle' color={color} size={size}/>
						),
					}}/>
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export default MainContainer;