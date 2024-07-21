import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useTheme } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextInput, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { useFormValidation, login } from '../utils/auth';

const { width, height } = Dimensions.get('window');

type SignInScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignIn'>;
type Props = {
    navigation: SignInScreenNavigationProp;
};

const SignInScreen: React.FC<Props> = ({ navigation }) => {
    const { colors, toggleTheme } = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { emailError, passwordError, validateFields } = useFormValidation();

    const paperTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: colors.primary,
            background: colors.background,
            text: colors.text,
            placeholder: colors.gray,
            error: colors.error,
            surface: colors.surface,
            onSurface: colors.onSurface,
            disabled: colors.gray,
            backdrop: colors.background,
            notification: colors.secondary,
        },
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        toggleThemeButton: {
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 1,
        },
        topContent: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingTop: 60,
        },
        title: {
            fontSize: 40,
            fontWeight: 'bold',
            color: colors.primary,
            marginBottom: 20,
        },
        bottomContent: {
            justifyContent: 'flex-end',
            paddingHorizontal: 16,
            paddingBottom: 40,
        },
        inputContainer: {
            marginBottom: 20,
        },
        button: {
            backgroundColor: colors.primary,
            borderRadius: 20,
            marginBottom: 20,
            paddingVertical: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        buttonText: {
            color: colors.onPrimary,
            fontSize: 20,
            marginLeft: 10,
        },
        signupText: {
            color: colors.onBackground,
            textAlign: 'center',
        },
        errorText: {
            color: colors.error,
            fontSize: 12,
            marginTop: -15,
            marginBottom: 10,
        },
    });

    const handleSignIn = async () => {

        try {
            await login(email, password);
            navigation.navigate('Home');
        } catch (error) {
            console.error('SignIn failed:', error);
            // Handle signIn error (e.g., show an error message to the user)
        }
    };

    return (
        <PaperProvider theme={paperTheme}>
            <SafeAreaView style={styles.container}>
                <TouchableOpacity style={styles.toggleThemeButton} onPress={toggleTheme}>
                    <Icon name="brightness-6" size={24} color={colors.onBackground} />
                </TouchableOpacity>
                <View style={styles.topContent}>
                    <Text style={styles.title}>Emo</Text>
                </View>
                <View style={styles.bottomContent}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            label="Email"
                            value={email}
                            onChangeText={setEmail}
                            mode="outlined"
                            keyboardType="email-address"
                            outlineColor={emailError ? colors.error : colors.onBackground}
                            textColor={colors.onBackground}
                            autoCapitalize="none"
                            outlineStyle={{
                                borderRadius: 12,
                                borderWidth: 1,
                            }}
                            theme={{
                                colors: {
                                    primary: colors.primary,
                                    onSurfaceVariant: colors.onBackground,
                                    text: colors.text,
                                    placeholder: colors.onBackground,
                                    error: colors.error,
                                }
                            }}
                            error={!!emailError}
                        />
                    </View>
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                    <View style={styles.inputContainer}>
                        <TextInput
                            label="Password"
                            value={password}
                            onChangeText={setPassword}
                            mode="outlined"
                            secureTextEntry
                            outlineStyle={{
                                borderRadius: 12,
                                borderWidth: 1,
                            }}
                            outlineColor={passwordError ? colors.error : colors.onBackground}
                            theme={{
                                colors: {
                                    primary: colors.primary,
                                    onSurfaceVariant: colors.onBackground,
                                    text: colors.text,
                                    placeholder: colors.onBackground,
                                    error: colors.error,
                                }
                            }}
                            error={!!passwordError}
                        />
                    </View>
                    {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

                    <TouchableOpacity onPress={handleSignIn} style={styles.button}>
                        <Icon name="login" size={24} color={colors.onPrimary} />
                        <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </PaperProvider>
    );
};

export default SignInScreen;
