import { AntDesign, Feather, FontAwesome5 } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { theme } from '../theme';

export default function Layout() {
    return (
        <>
            {/* <Screens>
            <Screens.Screen name='index' options={{ title: 'Shopping list' }} />
            <Screens.Screen name='counter' options={{ title: 'Counter' }} />
            <Screens.Screen name='idea' options={{ title: 'Idea' }} />
        </Screens> */}

            <Tabs screenOptions={{ tabBarActiveTintColor: theme.colorWine }}>
                <Tabs.Screen
                    name='index'
                    options={{
                        title: 'Shopping list',
                        tabBarIcon: ({ color, size }) => (
                            <Feather name='list' size={size} color={color} />
                        )
                    }}
                />
                <Tabs.Screen
                    name='counter'
                    options={{
                        title: 'Counter',
                        tabBarIcon: ({ color, size }) => (
                            <AntDesign name='clockcircleo' size={size} color={color} />
                        ),
                        headerShown: false
                    }}
                />
                <Tabs.Screen
                    name='idea'
                    options={{
                        title: 'Idea',
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome5 name='lightbulb' size={size} color={color} />
                        )
                    }}
                />
            </Tabs>
        </>
    );
}
