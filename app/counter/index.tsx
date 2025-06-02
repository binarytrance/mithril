import { useRouter } from 'expo-router';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { registerForPushNotificationsAsync } from '../../utils/registerForPushNotificationsAsync';
import { theme } from '../../theme';
import * as Notifications from 'expo-notifications';

export default function Counter() {
    const route = useRouter();
    const scheduleNotifications = async () => {
        const result = await registerForPushNotificationsAsync();
        console.log('Permission: ', result);
        if (result === 'granted') {
            console.log('Notifications permission granted');
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "I'm a notification from your app! 📨"
                },
                trigger: {
                    type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                    seconds: 5
                }
            });
        } else {
            Alert.alert(
                'Notifications Permission Denied',
                'Please enable notifications in your device settings to receive updates.',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
            );
        }
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => route.push('/idea')}>
                <Text>Go to idea</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Counter</Text>
            <TouchableOpacity
                onPress={scheduleNotifications}
                style={styles.button}
                activeOpacity={0.8}
            >
                <Text style={styles.buttonText}>Request permission</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 24
    },
    button: {
        backgroundColor: theme.colorBlack,
        padding: 12,
        borderRadius: 6
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1
    }
});
