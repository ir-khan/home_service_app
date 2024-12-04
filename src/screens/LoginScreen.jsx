import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, AntDesign } from "@expo/vector-icons";
import { login } from "../services/AuthService";

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSecure, setIsSecure] = useState(true);

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      console.log(response);
      if ( response == true ) {
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading} >Welcome Back</Text>
      <Text style={styles.text} >Log in to your account using {'\n'} email or social networks</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Enter Email'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Password'
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={isSecure}
        />
        <Feather
          name={isSecure ? 'eye-off' : 'eye'}
          size={22}
          color="#2e353d"
          style={styles.eye}
          onPress={() => setIsSecure(!isSecure)}
        />
      </View>
      <TouchableOpacity
        style={{ width: '80%' }}
        onPress={() => console.log('Forgot Password button pressed')}
      >
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.login}>Login</Text>
      </TouchableOpacity>
      <View style={styles.socialContainer}>
        <View style={styles.line}></View>
        <Text style={styles.textOR}>Or sign in with</Text>
        <View style={styles.line}></View>
      </View>
      <View style={styles.inputContainer}>
        <AntDesign name="apple1" size={24} color="#000" style={styles.socialIcon} />
        <Text style={{ fontSize: 16 }}>Login with Apple</Text>
      </View>
      <View style={styles.inputContainer}>
        <AntDesign name="google" size={24} color="#000" style={styles.socialIcon} />
        <Text style={{ fontSize: 16 }}>Login with Google</Text>
      </View>
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity
          onPress={() => console.log('Signup button pressed')}
        >
          <Text style={styles.signup}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
    color: '#cdcfd1',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
    padding: 14,
    flexDirection: 'row',
    borderColor: '#eceded',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  eye: {
    right: 8,
  },
  forgot: {
    fontSize: 14,
    color: '#4397f1',
    textAlign: 'right',
  },
  button: {
    width: '80%',
    padding: 14,
    backgroundColor: '#2274ed',
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 30,
  },
  login: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  socialContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  textOR: {
    fontSize: 15,
    color: '#cdcfd1',
    textAlign: 'center',
    marginHorizontal: 14,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#eceded',
  },
  socialIcon: {
    width: 30,
  },
  signupContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  signupText: {
    fontSize: 14,
  },
  signup: {
    fontSize: 14,
    color: '#4397f1',
  },
});
