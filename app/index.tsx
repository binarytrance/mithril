import { StyleSheet, View, TextInput, FlatList, Text, LayoutAnimation } from 'react-native';
import { theme } from '../theme';
import { ShoppingListItem } from '../Components/ShoppingListItem';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { getStorageItem, setStorageItem } from '../utils/storage';
import * as Haptics from 'expo-haptics';

const STORAGE_KEY = 'shoppingList';

type ShoppingListItemType = {
    id: string;
    name: string;
    isCompleted?: boolean;
    completedAt?: number;
    lastUpdatedAt: number;
};

const initialList: ShoppingListItemType[] = [
    { id: '1', name: 'Coffee', isCompleted: false, lastUpdatedAt: Date.now() },
    { id: '2', name: 'Tea', isCompleted: true, lastUpdatedAt: Date.now() },
    { id: '3', name: 'Milk', isCompleted: false, lastUpdatedAt: Date.now() }
];

// const placeholderList: ShoppingListItemType[] = new Array(1000).fill(null).map((_, index) => ({
//     id: (index + 1).toString(),
//     name: `Item ${index + 1}`,
//     isCompleted: index % 2 === 0
// }));

function orderShoppingList(shoppingList: ShoppingListItemType[]) {
    return shoppingList.sort((item1, item2) => {
        if (item1.completedAt && item2.completedAt) {
            return item2.completedAt - item1.completedAt;
        }

        if (item1.completedAt && !item2.completedAt) {
            return 1;
        }

        if (!item1.completedAt && item2.completedAt) {
            return -1;
        }

        if (!item1.completedAt && !item2.completedAt) {
            return item2.lastUpdatedAt - item1.lastUpdatedAt;
        }

        return 0;
    });
}

export default function App() {
    const [shoppingList, setShoppingList] = useState<ShoppingListItemType[]>([]);
    const [value, setValue] = useState<string>();

    useEffect(() => {
        const fetchInitial = async () => {
            const data = await getStorageItem(STORAGE_KEY);
            if (data) {
                setShoppingList(data);
            }
        };

        fetchInitial();
    }, []);

    const onDelete = (id: string) => {
        setStorageItem(
            STORAGE_KEY,
            shoppingList.filter(item => item.id !== id)
        );
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setShoppingList(prev => prev.filter(item => item.id !== id));
        console.log('Item deleted');
    };
    const onToggleCompletion = (id: string) => {
        const newShoppingList = shoppingList.map(item => {
            if (item.id === id) {
                if (item.completedAt) {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                } else {
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                }
                return {
                    ...item,
                    isCompleted: !item.isCompleted,
                    completedAt: item.completedAt ? undefined : Date.now(),
                    lastUpdatedAt: Date.now()
                };
            } else {
                return item;
            }
        });

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setStorageItem(STORAGE_KEY, newShoppingList);
        setShoppingList(newShoppingList);
        console.log('Item toggled');
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
                            const newShoppingList = [
                                {
                                    id: Math.random().toString(),
                                    name: value,
                                    isCompleted: false,
                                    lastUpdatedAt: Date.now()
                                },
                                ...shoppingList
                            ];
                            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                            setStorageItem(STORAGE_KEY, newShoppingList);
                            setShoppingList(newShoppingList);
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
            data={orderShoppingList(shoppingList)}
            renderItem={({ item }) => (
                <ShoppingListItem
                    name={item.name}
                    key={item.id}
                    isCompleted={item.isCompleted}
                    onDelete={() => onDelete(item.id)}
                    onToggleCompletion={() => onToggleCompletion(item.id)}
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
