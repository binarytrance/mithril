import { Alert, Button, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../theme';

type Props = {
    name: string;
};

export const ShoppingListItem = ({ name }: Props) => {
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
        <View style={{ borderBottomWidth: 1, borderColor: '#9245b9' }}>
            {/* <Text>Pixel ratio: {PixelRatio.get()}</Text> */}
            <Text style={styles.itemText}>{name}</Text>
            {/* <StatusBar style='auto' /> */}
            <View style={styles.buttonContainer}>
                {/* /** * You can use 3 kinds of button elements 1. Button - cannot be customised 2.
                    Pressable 3. TouchableOpacity */}
                <View style={styles.buttonWrapper}>
                    <Button title='Native Button' />
                </View>
                <Pressable onPress={() => console.log('pressable pressed!')} style={styles.button}>
                    <Text style={styles.buttonText}>Pressable Button</Text>
                </Pressable>
                <TouchableOpacity onPress={handleAlert} activeOpacity={0.8} style={styles.button}>
                    <Text style={styles.buttonText}>TouchableOp Button</Text>
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
        alignItems: 'flex-end',
        borderWidth: 2,
        borderColor: 'blue',
        borderRadius: 10
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
    }
});
