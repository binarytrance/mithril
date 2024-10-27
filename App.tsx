import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
    return (
        <View style={styles.container}>
            <View style={{ borderBottomWidth: 1, borderColor: '#9245b9' }}>
                {/* <Text>Pixel ratio: {PixelRatio.get()}</Text> */}
                <Text style={styles.itemText}>Coffee</Text>
                <StatusBar style='auto' />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,
        paddingVertical: 10
    },
    itemText: { color: '#5a065a', fontSize: 14, fontWeight: 'bold' }
});
