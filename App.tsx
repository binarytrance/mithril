import { StyleSheet, View } from 'react-native';
import { theme } from './theme';
import { ShoppingListItem } from './Components/ShoppingListItem';

export default function App() {
    return (
        <View style={styles.container}>
            <ShoppingListItem name='Coffee' />
            <ShoppingListItem name='Tea' isCompleted />
            <ShoppingListItem name='Coke' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colorWhite,
        // alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,
        paddingVertical: 10
    }
});
