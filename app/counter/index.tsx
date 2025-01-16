import { useRouter } from 'expo-router';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default function Counter() {
    const route = useRouter();
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => route.push('/idea')}>
                <Text>Go to idea</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Counter</Text>
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
    }
});
