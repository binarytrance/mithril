import { Alert, Button, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../theme';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as Haptics from 'expo-haptics';

type Props = {
    name: string;
    isCompleted?: boolean;
    onDelete: () => void;
    onToggleCompletion: () => void;
};

export const ShoppingListItem = ({ name, isCompleted, onDelete, onToggleCompletion }: Props) => {
    const handleAlert = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        Alert.alert('Are you sure?', `The item ${name} will be deleted permanently.`, [
            {
                text: 'Got it!',
                onPress: () => onDelete(),
                style: 'destructive'
            },
            {
                text: 'Cancel',
                style: 'cancel'
            }
        ]);
    };
    return (
        <Pressable
            onPress={onToggleCompletion}
            style={[
                {
                    borderBottomWidth: 1,
                    borderColor: '#9245b9',
                    padding: 8,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                },
                isCompleted ? styles.completedContainer : undefined
            ]}
        >
            {/* <Text>Pixel ratio: {PixelRatio.get()}</Text> */}
            <Text style={[styles.itemText, isCompleted ? styles.completedText : undefined]}>
                {name}
            </Text>
            {/* <StatusBar style='auto' /> */}
            <View style={styles.buttonContainer}>
                {/* /** * You can use 3 kinds of button elements 1. Button - cannot be customised 2.
                    Pressable 3. TouchableOpacity */}
                <View style={[styles.buttonWrapper, styles.displayNone]}>
                    <Button title='Native Button' />
                </View>
                <Pressable
                    onPress={() => console.log('pressable pressed!')}
                    style={[
                        styles.button,
                        styles.displayNone,
                        { borderWidth: 1, borderColor: '#9245b9' }
                    ]}
                >
                    <Text style={styles.buttonText}>Pressable Button</Text>
                </Pressable>
                <TouchableOpacity onPress={handleAlert} activeOpacity={0.8}>
                    <AntDesign
                        name='closecircle'
                        size={24}
                        color={isCompleted ? theme.colorGrey : theme.colorRed}
                    />
                </TouchableOpacity>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    itemText: { color: theme.colorWine, fontSize: 14, fontWeight: 'bold' },
    buttonWrapper: {
        width: 150
    },
    buttonContainer: {
        marginTop: 5,
        alignItems: 'flex-end'
        // borderWidth: 2,
        // borderColor: 'blue',
        // borderRadius: 10
    },
    button: {
        backgroundColor: theme.colorBlack,
        padding: 8,
        borderRadius: 6,
        marginTop: 2,
        marginBottom: 2
    },
    buttonText: {
        color: theme.colorWhite,
        letterSpacing: 2
    },
    displayNone: {
        display: 'none'
    },
    completedContainer: {
        backgroundColor: theme.colorLightGrey,
        borderBottomColor: theme.colorLightGrey
    },
    // completedButton: {
    //     backgroundColor: theme.colorGrey
    // },
    completedText: {
        textDecorationLine: 'line-through',
        textDecorationColor: theme.colorGrey,
        color: theme.colorGrey,
        fontWeight: 'normal'
    }
});
