import { MaterialIcons } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import { Pressable } from 'react-native';

export default function CounterLayout() {
    return (
        <Stack>
            <Stack.Screen
                name='index'
                options={{
                    title: 'Counters',
                    headerRight: () => (
                        <Link href='/counter/history'>
                            {/* <Pressable hitSlop={20}> */}
                            <MaterialIcons name='history' size={32} />
                            {/* </Pressable> */}
                        </Link>
                    )
                }}
            />
        </Stack>
    );
}
