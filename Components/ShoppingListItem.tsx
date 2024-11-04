import { Alert, Button, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../theme';

type Props = {
    name: string;
    isCompleted?: boolean;
};

export const ShoppingListItem = ({ name, isCompleted }: Props) => {
    const handleAlert = () => {
        Alert.alert(
            'You have pressed a button',
            `You have pressed on one of the button of the item ${name}`,
            [
                {
                    text: 'Got it!',
                    onPress: () => console.log('Got it!'),
                    style: 'destructive'
                },
                {
                    text: 'Cancel',
                    style: 'cancel'
                }
            ]
        );
    };
    return (
        <View
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
                    style={[styles.button, styles.displayNone]}
                >
                    <Text style={styles.buttonText}>Pressable Button</Text>
                </Pressable>
                <TouchableOpacity
                    onPress={handleAlert}
                    activeOpacity={0.8}
                    style={[styles.button, isCompleted ? styles.completedButton : undefined]}
                >
                    <Text style={styles.buttonText}>DELETE</Text>
                </TouchableOpacity>
            </View>
        </View>
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
    completedButton: {
        backgroundColor: theme.colorGrey
    },
    completedText: {
        textDecorationLine: 'line-through',
        textDecorationColor: theme.colorGrey,
        color: theme.colorGrey,
        fontWeight: 'normal'
    }
});
