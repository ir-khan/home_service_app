import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { auth,createUserWithEmailAndPassword } from "../../firebase";
import { collection, doc, setDoc } from '@firebase/firestore';
import { database } from "../../firebase";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Signup() {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [isPasswordVisible1, setPasswordVisibility1] = useState(false);
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');
  const [confirmpass, setconfirmpass] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };
  const togglePasswordVisibility1 = () => {
    setPasswordVisibility1(!isPasswordVisible1);
  };

  const signup = async (emaill, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, emaill, password);
        const usercollection = collection(database, 'users');
        if (userCredential) {
            const userdoc = doc(usercollection, userCredential.user.uid)
            await setDoc(userdoc, {
                uid: userCredential.user.uid,
                name: name,
                email: email,
            });
        }
    } catch (error) {

        console.log("Firebase Error:", error);
    }
};

const handleSubmit = async () => {


      console.log('Form submitted:', { name, email, pass });
      await signup(email, pass);

};
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topcontainer}>
        <Text style={styles.heading}>Create New Account</Text>
        <Text style={styles.text}>
          Setup Your username and Password. {"\n"} You can always change it
          later.
        </Text>
      </View>
      <View style={styles.inputcont}>
        <Text style={styles.user}>Enter Name</Text>
        <TextInput style={styles.input} placeholder="Enter Name" value={name} onChangeText={setname} />
      </View>
      <View style={styles.inputcont}>
        <Text style={styles.user}>Email Address</Text>
        <TextInput style={styles.input} placeholder="abc@gmail.com" value={email} onChangeText={setemail}/>
      </View>
      <View style={styles.inputcont}>
        <Text style={styles.user}>Mobile Number</Text>
        <TextInput style={styles.input} placeholder="111 222 333 444" />
      </View>
      <View style={styles.inputcont}>
        <Text style={styles.user}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="*******"
          secureTextEntry={!isPasswordVisible1}
          value={pass}
          onChangeText={setpass}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility1}
          style={styles.iconContainer}
        >
          <Entypo
            name={isPasswordVisible1 ? "eye" : "eye-with-line"}
            size={24}
            color="#13171B"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.inputcont}>
        <Text style={styles.user}>Confirm Passsword</Text>
        <TextInput
          style={styles.input}
          placeholder="*******"
          secureTextEntry={!isPasswordVisible}
          value={confirmpass}
          onChangeText={setconfirmpass}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.iconContainer}
        >
          <Entypo
            name={isPasswordVisible ? "eye" : "eye-with-line"}
            size={24}
            color="#13171B"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttontext}>Signup</Text>
      </TouchableOpacity>
      <View style={styles.alreadycont}>
        <Text>Already have account?</Text>
        <TouchableOpacity>
          <Text style={styles.login}> Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: 'center',
  },
  topcontainer: {
    marginTop: hp("10%"),
  },
  heading: {
    fontSize: wp("8%"),
    fontWeight: "700",
    textAlign: "center",
  },
  text: {
    fontSize: wp("4%"),
    textAlign: "center",
    color: "#CDCFD1",
  },
  user: {
    fontSize: wp("3%"),
    color: "#2274ed",
    marginLeft: wp("1%"),
  },
  inputcont: {
    borderWidth: 1,
    borderColor: "#2274ed",
    width: wp("85%"),
    height: hp("8%"),
    padding: wp("1.5%"),
    borderRadius: 10,
    marginTop: hp("2%"),
  },
  input: {},
  button: {
    width: wp("85%"),
    height: hp("8%"),
    backgroundColor: "#2274ed",
    borderRadius: 10,
    marginTop: hp("5%"),
    justifyContent: "center",
    alignItems: "center",
  },
  buttontext: {
    color: "white",
    fontSize: wp("5%"),
    fontWeight: "500",
  },
  login: {
    fontSize: wp("3.7%"),
    color: "#2274ed",
  },
  alreadycont: {
    flexDirection: "row",
    marginTop: hp("2%"),
  },
  iconContainer: {
    position: "absolute",
    alignSelf: "flex-end",
    right: wp("3%"),
    top: hp("2%"),
  },
});
