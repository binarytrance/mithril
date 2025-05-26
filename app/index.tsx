import { StyleSheet, View } from 'react-native';
import { theme } from '../theme';
import { ShoppingListItem } from '../Components/ShoppingListItem';
import { Link } from 'expo-router';
import { useState } from 'react';

type ShoppingListItemType = {
    id: string;
    name: string;
    isCompleted?: boolean;
};

const initialList: ShoppingListItemType[] = [
    { id: '1', name: 'Coffee', isCompleted: false },
    { id: '2', name: 'Tea', isCompleted: true },
    { id: '3', name: 'Milk', isCompleted: false }
];

export default function App() {
    const [shoppingList] = useState(initialList);
    return (
        <View style={styles.container}>
            <Link href='/counter'>Go to Counter</Link>
            {shoppingList.map(item => (
                <ShoppingListItem name={item.name} key={item.id} isCompleted={item.isCompleted} />
            ))}
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
