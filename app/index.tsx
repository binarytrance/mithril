import { StyleSheet, View, TextInput, FlatList, Text } from 'react-native';
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

// const placeholderList: ShoppingListItemType[] = new Array(1000).fill(null).map((_, index) => ({
//     id: (index + 1).toString(),
//     name: `Item ${index + 1}`,
//     isCompleted: index % 2 === 0
// }));

export default function App() {
    const [shoppingList, setShoppingList] = useState(initialList);
    const [value, setValue] = useState<string>();

    const onDelete = (id: string) => {
        setShoppingList(prev => prev.filter(item => item.id !== id));
        console.log('Item deleted');
    };
    return (
        <FlatList
            ListHeaderComponent={
                <TextInput
                    value={value}
                    style={styles.textInput}
                    onChangeText={setValue}
                    placeholder='Coffee'
                    onSubmitEditing={() => {
                        if (value) {
                            setShoppingList(prev => [
                                { id: Math.random().toString(), name: value, isCompleted: false },
                                ...prev
                            ]);
                            setValue(undefined);
                        }
                    }}
                    returnKeyType='done'
                />
            }
            ListEmptyComponent={
                <View style={styles.listEmptyContainer}>
                    <Text>Your shopping list is empty</Text>
                </View>
            }
            data={shoppingList}
            renderItem={({ item }) => (
                <ShoppingListItem
                    name={item.name}
                    key={item.id}
                    isCompleted={item.isCompleted}
                    onDelete={() => onDelete(item.id)}
                />
            )}
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            stickyHeaderIndices={[]}
        ></FlatList>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colorWhite,
        paddingTop: 12
        // paddingHorizontal: 8,
        // paddingVertical: 10,
        // paddingTop: 12
    },
    contentContainer: {
        paddingBottom: 24
    },
    listEmptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 18
    },
    textInput: {
        borderColor: theme.colorLightGrey,
        borderWidth: 2,
        padding: 12,
        fontSize: 18,
        borderRadius: 50,
        marginHorizontal: 12,
        marginBottom: 12,
        backgroundColor: theme.colorWhite
    }
});
